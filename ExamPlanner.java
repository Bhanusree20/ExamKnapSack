import java.util.*;

public class ExamPlanner {

    // One topic the student wants to study
    record Topic(String name, int marks, int blocks, int confidence) {
        // Weak topics (low confidence) with high marks get the highest value
        int value() {
            return marks * (6 - confidence);
        }
    }

    // The answer, plus the full DP table (needed later for the visualizer)
    record Result(int totalValue, int blocksUsed, List<Topic> chosen, int[][] table) {}

    static Result plan(List<Topic> topics, int capacity) {
        int n = topics.size();
        int[][] dp = new int[n + 1][capacity + 1];

        // Fill the table: for each topic, decide skip or take
        for (int i = 1; i <= n; i++) {
            Topic t = topics.get(i - 1);
            for (int w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w]; // skip this topic
                if (t.blocks() <= w) {   // take it, if it fits
                    dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - t.blocks()] + t.value());
                }
            }
        }

        // Walk backwards through the table to find which topics were chosen
        List<Topic> chosen = new ArrayList<>();
        int w = capacity;
        int used = 0;
        for (int i = n; i >= 1; i--) {
            if (dp[i][w] != dp[i - 1][w]) {
                Topic t = topics.get(i - 1);
                chosen.add(0, t);
                w -= t.blocks();
                used += t.blocks();
            }
        }

        return new Result(dp[n][capacity], used, chosen, dp);
    }

    public static void main(String[] args) {
        List<Topic> topics = List.of(
            new Topic("Dynamic Programming", 10, 4, 2),
            new Topic("Greedy", 6, 2, 4),
            new Topic("Graphs", 8, 3, 1),
            new Topic("Sorting", 5, 2, 5),
            new Topic("Backtracking", 7, 3, 3)
        );

        int capacity = 6; // 6 blocks = 3 hours

        Result r = plan(topics, capacity);

        System.out.println("Available: " + capacity + " blocks (" + capacity * 30 + " minutes)");
        System.out.println("Best total value: " + r.totalValue());
        System.out.println("Blocks used: " + r.blocksUsed());
        System.out.println("Study these topics:");
        for (Topic t : r.chosen()) {
            System.out.println("  - " + t.name() + " (value " + t.value() + ", " + t.blocks() + " blocks)");
        }
    }
}