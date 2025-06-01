package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.Feedback;
import com.hospital.service.FeedbackService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;

	@PostMapping
	public Feedback submitFeedback(@RequestBody Feedback feedback) {
		return feedbackService.saveFeedback(feedback);
	}

	@GetMapping
	public List<Feedback> getAllFeedback() {
		return feedbackService.getAllFeedback();
	}
}
