package com.pm.appointmentservice.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class AppointmentResponseDto {

    private UUID id;
    private UUID patientId;
    private String patientName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String reason;
    private Long version;


    public AppointmentResponseDto() {}

    public AppointmentResponseDto(UUID id, UUID patientId, String patientName,
                                  LocalDateTime startTime, LocalDateTime endTime, String reason, Long version) {
        this.id = id;
        this.patientId = patientId;
        this.patientName = patientName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reason = reason;
        this.version = version;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getPatientId() {
        return patientId;
    }

    public void setPatientId(UUID patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
