package com.johnabbott.medical_system.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctor")
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String specialty;

    @Column(nullable = false)
    private String password;

}
