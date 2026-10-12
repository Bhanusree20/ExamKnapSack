package com.examknapsack.backend;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class TopicController {

    private final TopicRepository topicRepository;

    public TopicController(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @GetMapping("/subjects/{subjectId}/topics")
    public List<Topic> getBySubject(@PathVariable("subjectId") Long subjectId) {
        return topicRepository.findBySubjectId(subjectId);
    }

    @GetMapping("/topics/{id}")
    public Topic getOne(@PathVariable("id") Long id) {
        return topicRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found"));
    }

    @PostMapping("/subjects/{subjectId}/topics")
    public Topic create(@PathVariable("subjectId") Long subjectId, @Valid @RequestBody Topic topic) {
        topic.setSubjectId(subjectId);
        return topicRepository.save(topic);
    }

    @DeleteMapping("/topics/{id}")
    public void delete(@PathVariable("id") Long id) {
        topicRepository.deleteById(id);
    }
}
