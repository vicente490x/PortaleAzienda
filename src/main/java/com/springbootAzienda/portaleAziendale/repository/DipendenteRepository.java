package com.springbootAzienda.portaleAziendale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootAzienda.portaleAziendale.entity.DipendenteEntity;

public interface DipendenteRepository extends JpaRepository<DipendenteEntity, Long> {

    List<DipendenteEntity> findBySede_Id(Long sedeId);
}
