package com.springbootAzienda.portaleAziendale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootAzienda.portaleAziendale.entity.AziendaEntity;

public interface AziendaRepository extends JpaRepository<AziendaEntity, Long> {
}
