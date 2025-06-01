package com.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.entity.Doctor;
import com.hospital.entity.Feedback;
import com.hospital.repository.FeedbackRepository;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;

	public Feedback saveFeedback(Feedback feedback) {
		return feedbackRepository.save(feedback);
	}

	public List<Feedback> getAllFeedback() {
		return feedbackRepository.findAll();
	}

	@ManyToOne
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;

}
