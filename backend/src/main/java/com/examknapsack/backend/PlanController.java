package com.examknapsack.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping("/subjects/{subjectId}/plan")
    public PlanResult plan(@PathVariable("subjectId") Long subjectId,
                           @RequestParam("blocks") int blocks) {
        if (blocks < 1 || blocks > 200) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "blocks must be between 1 and 200");
        }
        return planService.plan(subjectId, blocks);
    }
}
