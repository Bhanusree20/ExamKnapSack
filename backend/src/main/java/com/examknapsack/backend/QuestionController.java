package com.examknapsack.backend;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final TopicRepository topicRepository;

    public QuestionController(QuestionRepository questionRepository, TopicRepository topicRepository) {
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
    }

    @GetMapping("/topics/{topicId}/questions")
    public List<Question> getByTopic(@PathVariable("topicId") Long topicId) {
        return questionRepository.findByTopicId(topicId);
    }

    @PostMapping("/topics/{topicId}/questions")
    public Question create(@PathVariable("topicId") Long topicId, @Valid @RequestBody Question question) {
        question.setTopicId(topicId);
        Question saved = questionRepository.save(question);
        updateConfidence(topicId);
        return saved;
    }

    @PutMapping("/questions/{id}/solved")
    public Question setSolved(@PathVariable("id") Long id, @RequestParam("value") boolean value) {
        Question q = questionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
        q.setSolved(value);
        Question saved = questionRepository.save(q);
        updateConfidence(saved.getTopicId());
        return saved;
    }

    // One-time helper: recalculates the confidence of every topic from its solved questions
    @PostMapping("/confidence/recalculate")
    public Map<String, Integer> recalculateAll() {
        List<Topic> topics = topicRepository.findAll();
        for (Topic t : topics) {
            updateConfidence(t.getId());
        }
        return Map.of("topicsChecked", topics.size());
    }

    // confidence = 1 + round(4 * solved / total), so 0 solved = 1 and all solved = 5
    private void updateConfidence(Long topicId) {
        List<Question> questions = questionRepository.findByTopicId(topicId);
        if (questions.isEmpty()) {
            return;
        }
        long solved = questions.stream().filter(Question::isSolved).count();
        int confidence = 1 + (int) Math.round(4.0 * solved / questions.size());
        topicRepository.findById(topicId).ifPresent(t -> {
            t.setConfidence(confidence);
            topicRepository.save(t);
        });
    }
}
