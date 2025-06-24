package com.example.crm.service;

import com.example.crm.model.DealInsight;
import com.example.crm.repository.DealInsightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealInsightService {
    private final DealInsightRepository repository;

    public DealInsightService(DealInsightRepository repository) {
        this.repository = repository;
    }

    public List<DealInsight> findAll() { return repository.findAll(); }
    public DealInsight save(DealInsight stat) { return repository.save(stat); }
    public void delete(Long id) { repository.deleteById(id); }
}