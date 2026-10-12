package com.examknapsack.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final String SUBJECT_NAME = "DSA Placement Prep";

    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;

    public DataSeeder(SubjectRepository subjectRepository,
                      TopicRepository topicRepository,
                      QuestionRepository questionRepository) {
        this.subjectRepository = subjectRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {
        boolean exists = subjectRepository.findAll().stream()
                .anyMatch(s -> SUBJECT_NAME.equals(s.getName()));
        if (exists) {
            return;
        }

        Subject subject = new Subject();
        subject.setName(SUBJECT_NAME);
        subject = subjectRepository.save(subject);
        Long id = subject.getId();

        // addTopic(subjectId, name, importance for interviews (1-10), study time in 30-min blocks, questions)
        addTopic(id, "Arrays & Hashing", 10, 4, new String[][] {
            {"Two Sum", "two-sum", "Easy"},
            {"Contains Duplicate", "contains-duplicate", "Easy"},
            {"Valid Anagram", "valid-anagram", "Easy"},
            {"Group Anagrams", "group-anagrams", "Medium"},
            {"Top K Frequent Elements", "top-k-frequent-elements", "Medium"},
            {"Product of Array Except Self", "product-of-array-except-self", "Medium"}
        });

        addTopic(id, "Two Pointers & Sliding Window", 9, 4, new String[][] {
            {"Valid Palindrome", "valid-palindrome", "Easy"},
            {"Best Time to Buy and Sell Stock", "best-time-to-buy-and-sell-stock", "Easy"},
            {"3Sum", "3sum", "Medium"},
            {"Container With Most Water", "container-with-most-water", "Medium"},
            {"Longest Substring Without Repeating Characters", "longest-substring-without-repeating-characters", "Medium"},
            {"Trapping Rain Water", "trapping-rain-water", "Hard"}
        });

        addTopic(id, "Binary Search", 8, 3, new String[][] {
            {"Binary Search", "binary-search", "Easy"},
            {"Search in Rotated Sorted Array", "search-in-rotated-sorted-array", "Medium"},
            {"Find Minimum in Rotated Sorted Array", "find-minimum-in-rotated-sorted-array", "Medium"},
            {"Koko Eating Bananas", "koko-eating-bananas", "Medium"}
        });

        addTopic(id, "Linked List", 8, 3, new String[][] {
            {"Reverse Linked List", "reverse-linked-list", "Easy"},
            {"Merge Two Sorted Lists", "merge-two-sorted-lists", "Easy"},
            {"Linked List Cycle", "linked-list-cycle", "Easy"},
            {"Remove Nth Node From End of List", "remove-nth-node-from-end-of-list", "Medium"},
            {"LRU Cache", "lru-cache", "Medium"}
        });

        addTopic(id, "Stack & Queue", 7, 3, new String[][] {
            {"Valid Parentheses", "valid-parentheses", "Easy"},
            {"Min Stack", "min-stack", "Medium"},
            {"Daily Temperatures", "daily-temperatures", "Medium"},
            {"Largest Rectangle in Histogram", "largest-rectangle-in-histogram", "Hard"}
        });

        addTopic(id, "Recursion & Backtracking", 8, 4, new String[][] {
            {"Subsets", "subsets", "Medium"},
            {"Permutations", "permutations", "Medium"},
            {"Combination Sum", "combination-sum", "Medium"},
            {"Word Search", "word-search", "Medium"},
            {"N-Queens", "n-queens", "Hard"}
        });

        addTopic(id, "Trees & BST", 9, 5, new String[][] {
            {"Maximum Depth of Binary Tree", "maximum-depth-of-binary-tree", "Easy"},
            {"Invert Binary Tree", "invert-binary-tree", "Easy"},
            {"Binary Tree Level Order Traversal", "binary-tree-level-order-traversal", "Medium"},
            {"Validate Binary Search Tree", "validate-binary-search-tree", "Medium"},
            {"Lowest Common Ancestor of a Binary Tree", "lowest-common-ancestor-of-a-binary-tree", "Medium"},
            {"Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", "Hard"}
        });

        addTopic(id, "Heaps & Priority Queue", 6, 3, new String[][] {
            {"Kth Largest Element in an Array", "kth-largest-element-in-an-array", "Medium"},
            {"Task Scheduler", "task-scheduler", "Medium"},
            {"Find Median from Data Stream", "find-median-from-data-stream", "Hard"},
            {"Merge k Sorted Lists", "merge-k-sorted-lists", "Hard"}
        });

        addTopic(id, "Graphs (BFS & DFS)", 9, 5, new String[][] {
            {"Number of Islands", "number-of-islands", "Medium"},
            {"Clone Graph", "clone-graph", "Medium"},
            {"Course Schedule", "course-schedule", "Medium"},
            {"Rotting Oranges", "rotting-oranges", "Medium"},
            {"Word Ladder", "word-ladder", "Hard"}
        });

        addTopic(id, "Dynamic Programming", 10, 6, new String[][] {
            {"Climbing Stairs", "climbing-stairs", "Easy"},
            {"House Robber", "house-robber", "Medium"},
            {"Coin Change", "coin-change", "Medium"},
            {"Longest Increasing Subsequence", "longest-increasing-subsequence", "Medium"},
            {"Longest Common Subsequence", "longest-common-subsequence", "Medium"},
            {"Partition Equal Subset Sum", "partition-equal-subset-sum", "Medium"},
            {"Word Break", "word-break", "Medium"}
        });

        addTopic(id, "Greedy & Intervals", 6, 3, new String[][] {
            {"Maximum Subarray", "maximum-subarray", "Medium"},
            {"Jump Game", "jump-game", "Medium"},
            {"Merge Intervals", "merge-intervals", "Medium"},
            {"Non-overlapping Intervals", "non-overlapping-intervals", "Medium"},
            {"Gas Station", "gas-station", "Medium"}
        });
    }

    private void addTopic(Long subjectId, String name, int marks, int blocks, String[][] questions) {
        Topic topic = new Topic();
        topic.setSubjectId(subjectId);
        topic.setName(name);
        topic.setMarks(marks);
        topic.setBlocks(blocks);
        topic.setConfidence(2);
        topic = topicRepository.save(topic);

        for (String[] q : questions) {
            Question question = new Question();
            question.setTopicId(topic.getId());
            question.setTitle(q[0]);
            question.setUrl("https://leetcode.com/problems/" + q[1] + "/");
            question.setDifficulty(q[2]);
            questionRepository.save(question);
        }
    }
}
