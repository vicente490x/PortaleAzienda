package com.springbootAzienda.portaleAziendale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootAzienda.portaleAziendale.entity.SedeEntity;

public interface SedeRepository extends JpaRepository<SedeEntity, Long> {

    List<SedeEntity> findByAzienda_Id(Long aziendaId);
}
