package com.johnabbott.medical_system.dao;

import com.johnabbott.medical_system.entity.Doctor;
import com.johnabbott.medical_system.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByEmail(String email);
}
