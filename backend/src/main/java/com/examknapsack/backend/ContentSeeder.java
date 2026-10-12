package com.examknapsack.backend;

import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

// Loads the lesson text files (src/main/resources/lessons) into the topics table at startup
@Component
public class ContentSeeder implements CommandLineRunner {

    private final TopicRepository topicRepository;

    public ContentSeeder(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Map<String, String> files = new LinkedHashMap<>();
        files.put("Arrays & Hashing", "arrays-hashing");
        files.put("Two Pointers & Sliding Window", "two-pointers");
        files.put("Binary Search", "binary-search");
        files.put("Linked List", "linked-list");
        files.put("Stack & Queue", "stack-queue");
        files.put("Recursion & Backtracking", "recursion-backtracking");
        files.put("Trees & BST", "trees-bst");
        files.put("Heaps & Priority Queue", "heaps-priority-queue");
        files.put("Graphs (BFS & DFS)", "graphs-bfs-dfs");
        files.put("Dynamic Programming", "dynamic-programming");
        files.put("Greedy & Intervals", "greedy-intervals");

        for (Topic topic : topicRepository.findAll()) {
            String file = files.get(topic.getName());
            if (file == null) {
                continue;
            }
            ClassPathResource resource = new ClassPathResource("lessons/" + file + ".txt");
            String text = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                    .replace("\r\n", "\n");
            if (!text.equals(topic.getExplanation())) {
                topic.setExplanation(text);
                topicRepository.save(topic);
            }
        }
    }
}
