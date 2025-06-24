package com.example.crm.controller;

import com.example.crm.model.ActivityStat;
import com.example.crm.service.ActivityStatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity-stats")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ActivityStatController {
    private final ActivityStatService service;

    public ActivityStatController(ActivityStatService service) {
        this.service = service;
    }

    @GetMapping
    public List<ActivityStat> getAll() { return service.findAll(); }

    @PostMapping
    public ActivityStat create(@RequestBody ActivityStat stat) { return service.save(stat); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}