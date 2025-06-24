package com.example.crm.service;

import com.example.crm.model.ActivityStat;
import com.example.crm.repository.ActivityStatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityStatService {
    private final ActivityStatRepository repository;

    public ActivityStatService(ActivityStatRepository repository) {
        this.repository = repository;
    }

    public List<ActivityStat> findAll() { return repository.findAll(); }
    public ActivityStat save(ActivityStat stat) { return repository.save(stat); }
    public void delete(Long id) { repository.deleteById(id); }
}