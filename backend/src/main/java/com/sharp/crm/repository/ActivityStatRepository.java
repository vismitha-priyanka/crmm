package com.example.crm.repository;

import com.example.crm.model.ActivityStat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityStatRepository extends JpaRepository<ActivityStat, Long> {
}