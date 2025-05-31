package com.hospital.entity;

import com.hospital.enums.Status;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String doctorName;
    private String date;
    private String time;

    @Enumerated(EnumType.STRING)
    private Status status;
}
