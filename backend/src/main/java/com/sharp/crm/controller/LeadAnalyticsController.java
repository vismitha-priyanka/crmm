package com.example.crm.controller;

import com.example.crm.model.LeadAnalytics;
import com.example.crm.service.LeadAnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lead-analytics")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class LeadAnalyticsController {
    private final LeadAnalyticsService service;

    public LeadAnalyticsController(LeadAnalyticsService service) {
        this.service = service;
    }

    @GetMapping
    public List<LeadAnalytics> getAll() { return service.findAll(); }

    @PostMapping
    public LeadAnalytics create(@RequestBody LeadAnalytics stat) { return service.save(stat); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}OverviewMetricController.java