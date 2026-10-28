package com.klef.soa.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.entity.PhotographySessionEntity;
import com.klef.soa.repository.PhotographySessionRepository;
import com.klef.soa.service.PhotographySessionService;

@Service
public class PhotographySessionServiceImpl implements PhotographySessionService {

    @Autowired
    private PhotographySessionRepository repository;

    @Override
    public PhotographySessionEntity addSession(PhotographySessionEntity session) {
        return repository.save(session);
    }

    @Override
    public List<PhotographySessionEntity> getAllSessions() {
        return repository.findAll();
    }

    @Override
    public PhotographySessionEntity getSessionById(Long id) {
        Optional<PhotographySessionEntity> optional = repository.findById(id);

        if (optional.isPresent()) {
            return optional.get();
        }

        return null;
    }

    @Override
    public PhotographySessionEntity updateSession(PhotographySessionEntity session) {
        return repository.save(session);
    }

    @Override
    public String deleteSession(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Photography session deleted successfully";
        }

        return "Photography session not found";
    }
}