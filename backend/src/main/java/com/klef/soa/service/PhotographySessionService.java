package com.klef.soa.service;

import java.util.List;

import com.klef.soa.entity.PhotographySessionEntity;

public interface PhotographySessionService {

    public PhotographySessionEntity addSession(PhotographySessionEntity session);

    public List<PhotographySessionEntity> getAllSessions();

    public PhotographySessionEntity getSessionById(Long id);

    public PhotographySessionEntity updateSession(PhotographySessionEntity session);

    public String deleteSession(Long id);
}