package com.examknapsack.backend;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    private final TopicRepository topicRepository;

    public PlanService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public PlanResult plan(Long subjectId, int capacity) {
        List<Topic> topics = topicRepository.findBySubjectId(subjectId);
        int n = topics.size();

        // Value of each topic: weak topics with high marks score the highest
        int[] value = new int[n];
        List<PlanResult.Row> rows = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            Topic t = topics.get(i);
            value[i] = t.getMarks() * (6 - t.getConfidence());
            rows.add(new PlanResult.Row(t.getId(), t.getName(), t.getBlocks(), value[i]));
        }

        // Fill the DP table: for each topic, decide skip or take
        int[][] dp = new int[n + 1][capacity + 1];
        for (int i = 1; i <= n; i++) {
            Topic t = topics.get(i - 1);
            for (int w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w];
                if (t.getBlocks() <= w) {
                    dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - t.getBlocks()] + value[i - 1]);
                }
            }
        }

        // Walk backwards through the table to find which topics were chosen
        List<PlanResult.Item> chosen = new ArrayList<>();
        int w = capacity;
        int used = 0;
        for (int i = n; i >= 1; i--) {
            if (dp[i][w] != dp[i - 1][w]) {
                Topic t = topics.get(i - 1);
                chosen.add(0, new PlanResult.Item(
                        t.getId(), t.getName(), t.getMarks(),
                        t.getBlocks(), t.getConfidence(), value[i - 1]));
                w -= t.getBlocks();
                used += t.getBlocks();
            }
        }

        return new PlanResult(capacity, dp[n][capacity], used, chosen, rows, dp);
    }
}
