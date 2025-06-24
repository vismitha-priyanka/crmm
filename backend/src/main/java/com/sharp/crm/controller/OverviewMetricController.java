package com.example.crm.controller;

import com.example.crm.model.OverviewMetric;
import com.example.crm.service.OverviewMetricService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/overview-metrics")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OverviewMetricController {
    private final OverviewMetricService service;

    public OverviewMetricController(OverviewMetricService service) {
        this.service = service;
    }

    @GetMapping
    public List<OverviewMetric> getAll() { return service.findAll(); }

    @PostMapping
    public OverviewMetric create(@RequestBody OverviewMetric stat) { return service.save(stat); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}