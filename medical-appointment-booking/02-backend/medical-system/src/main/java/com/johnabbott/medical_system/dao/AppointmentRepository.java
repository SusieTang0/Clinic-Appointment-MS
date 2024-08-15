package com.johnabbott.medical_system.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.johnabbott.medical_system.entity.Appointment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findByDoctorId(Long doctorId);
	List<Appointment> findByPatientId(Long patientId);
}

