package com.example.crm.controller;

import com.example.crm.model.DealInsight;
import com.example.crm.service.DealInsightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deal-insights")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class DealInsightController {
    private final DealInsightService service;

    public DealInsightController(DealInsightService service) {
        this.service = service;
    }

    @GetMapping
    public List<DealInsight> getAll() { return service.findAll(); }

    @PostMapping
    public DealInsight create(@RequestBody DealInsight stat) { return service.save(stat); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}