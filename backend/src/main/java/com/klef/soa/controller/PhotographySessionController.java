package com.klef.soa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.entity.PhotographySessionEntity;
import com.klef.soa.service.PhotographySessionService;

@RestController
@RequestMapping("/photography")
@CrossOrigin(origins = "http://localhost:5174")
public class PhotographySessionController {

    @Autowired
    private PhotographySessionService service;

    // Add a new photography session
    @PostMapping("/add")
    public PhotographySessionEntity addSession(
            @RequestBody PhotographySessionEntity session) {

        return service.addSession(session);
    }

    // Get all photography sessions
    @GetMapping("/all")
    public List<PhotographySessionEntity> getAllSessions() {

        return service.getAllSessions();
    }

    // Get a photography session by ID
    @GetMapping("/get/{id}")
    public PhotographySessionEntity getSessionById(
            @PathVariable Long id) {

        return service.getSessionById(id);
    }

    // Update an existing photography session
    @PutMapping("/update")
    public PhotographySessionEntity updateSession(
            @RequestBody PhotographySessionEntity session) {

        return service.updateSession(session);
    }

    // Delete a photography session by ID
    @DeleteMapping("/delete/{id}")
    public String deleteSession(@PathVariable Long id) {

        service.deleteSession(id);

        return "Photography session deleted successfully";
    }
}