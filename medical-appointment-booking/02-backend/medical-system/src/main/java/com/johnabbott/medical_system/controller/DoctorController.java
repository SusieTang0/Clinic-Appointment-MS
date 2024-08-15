package com.johnabbott.medical_system.controller;

import com.johnabbott.medical_system.dao.DoctorRepository;
import com.johnabbott.medical_system.dao.PatientRepository;
import com.johnabbott.medical_system.entity.Doctor;
import com.johnabbott.medical_system.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Doctor> getDoctorByEmail(@PathVariable String email) {
        Doctor doctor = doctorRepository.findByEmail(email);
        return doctor != null ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }
}
