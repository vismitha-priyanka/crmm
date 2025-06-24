package com.example.crm.service;

import com.example.crm.model.LeadAnalytics;
import com.example.crm.repository.LeadAnalyticsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadAnalyticsService {
    private final LeadAnalyticsRepository repository;

    public LeadAnalyticsService(LeadAnalyticsRepository repository) {
        this.repository = repository;
    }

    public List<LeadAnalytics> findAll() { return repository.findAll(); }
    public LeadAnalytics save(LeadAnalytics stat) { return repository.save(stat); }
    public void delete(Long id) { repository.deleteById(id); }
}