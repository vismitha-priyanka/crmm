package com.example.crm.service;

import com.example.crm.model.OverviewMetric;
import com.example.crm.repository.OverviewMetricRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OverviewMetricService {
    private final OverviewMetricRepository repository;

    public OverviewMetricService(OverviewMetricRepository repository) {
        this.repository = repository;
    }

    public List<OverviewMetric> findAll() { return repository.findAll(); }
    public OverviewMetric save(OverviewMetric stat) { return repository.save(stat); }
    public void delete(Long id) { repository.deleteById(id); }
}