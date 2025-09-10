package com.pm.appointmentservice.repository;

import com.pm.appointmentservice.entity.CachedPatient;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CachedPatientRepository extends JpaRepository<CachedPatient, UUID> {

}
