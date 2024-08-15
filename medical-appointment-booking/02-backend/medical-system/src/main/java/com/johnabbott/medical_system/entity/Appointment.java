package com.johnabbott.medical_system.entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "appointment")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private String doctorName;

    @Column(nullable = false)
    private Long doctorId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;


    private String description;

    @Column(nullable = false)
    private boolean status;

}
