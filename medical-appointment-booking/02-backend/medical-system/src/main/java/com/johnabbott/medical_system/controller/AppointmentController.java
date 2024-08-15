package com.johnabbott.medical_system.controller;

import com.johnabbott.medical_system.dao.AppointmentRepository;
import com.johnabbott.medical_system.entity.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        return appointment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctorId(@PathVariable Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatientId(@PathVariable Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @PostMapping("/booking")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointment.setDate(updatedAppointment.getDate());
                    appointment.setTime(updatedAppointment.getTime());
                    appointment.setDescription(updatedAppointment.getDescription());
                    appointment.setDoctorId(updatedAppointment.getDoctorId());
                    appointment.setPatientId(updatedAppointment.getPatientId());
                    return ResponseEntity.ok(appointmentRepository.save(appointment));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointmentRepository.delete(appointment);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
