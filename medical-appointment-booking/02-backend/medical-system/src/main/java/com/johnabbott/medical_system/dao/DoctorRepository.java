package com.johnabbott.medical_system.dao;

import com.johnabbott.medical_system.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Doctor findByEmail(String email);

}