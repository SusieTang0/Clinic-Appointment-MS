package com.johnabbott.medical_system.controller;

import com.johnabbott.medical_system.dao.PatientRepository;
import com.johnabbott.medical_system.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return patient.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Patient> getPatientByEmail(@PathVariable String email) {
        Patient patient = patientRepository.findByEmail(email);
        return patient != null ? ResponseEntity.ok(patient) : ResponseEntity.notFound().build();
    }

    @PostMapping("/register")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patient.setFirstname(updatedPatient.getFirstname());
                    patient.setLastname(updatedPatient.getLastname());
                    patient.setEmail(updatedPatient.getEmail());
                    patient.setPhone(updatedPatient.getPhone());
                    patient.setPassword(updatedPatient.getPassword());
                    return ResponseEntity.ok(patientRepository.save(patient));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patientRepository.delete(patient);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
