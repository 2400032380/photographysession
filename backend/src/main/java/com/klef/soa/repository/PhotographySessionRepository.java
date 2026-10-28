package com.klef.soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.soa.entity.PhotographySessionEntity;

public interface PhotographySessionRepository extends JpaRepository<PhotographySessionEntity, Long> {

}