package com.springbootAzienda.portaleAziendale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springbootAzienda.portaleAziendale.entity.ProgettoEntity;

public interface ProgettoRepository extends JpaRepository<ProgettoEntity, Long> {

    
    @Query("SELECT p FROM ProgettoEntity p JOIN p.dipendenti d JOIN d.sede s WHERE s.azienda.id = :aziendaId")
    List<ProgettoEntity> findByAziendaId(@Param("aziendaId") Long aziendaId);

    List<ProgettoEntity> findByNomeContainingIgnoreCase(String nome);
}