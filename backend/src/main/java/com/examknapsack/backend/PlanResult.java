package com.examknapsack.backend;

import java.util.List;

public record PlanResult(
        int capacity,
        int totalValue,
        int blocksUsed,
        List<Item> chosen,
        List<Row> rows,
        int[][] table) {

    public record Item(
            Long topicId,
            String name,
            int marks,
            int blocks,
            int confidence,
            int value) {
    }

    public record Row(
            Long topicId,
            String name,
            int blocks,
            int value) {
    }
}
