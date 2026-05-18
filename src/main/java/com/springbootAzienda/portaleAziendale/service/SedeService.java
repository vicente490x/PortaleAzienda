package com.springbootAzienda.portaleAziendale.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.springbootAzienda.portaleAziendale.dto.SedeDTO;
import com.springbootAzienda.portaleAziendale.entity.AziendaEntity;
import com.springbootAzienda.portaleAziendale.entity.SedeEntity;
import com.springbootAzienda.portaleAziendale.repository.AziendaRepository;
import com.springbootAzienda.portaleAziendale.repository.SedeRepository;

@Service
public class SedeService {

    private final SedeRepository sedeRepo;
    private final AziendaRepository aziendaRepo;

    public SedeService(SedeRepository sedeRepo, AziendaRepository aziendaRepo) {
        this.sedeRepo = sedeRepo;
        this.aziendaRepo = aziendaRepo;
    }

    private SedeDTO toDTO(SedeEntity s) {
        SedeDTO dto = new SedeDTO();
        dto.setId(s.getId());
        dto.setCitta(s.getCitta());
        dto.setVia(s.getVia());
        dto.setAziendaId(s.getAzienda().getId());
        dto.setAziendaNome(s.getAzienda().getNome());
        return dto;
    }
    
    private SedeEntity toEntity(SedeDTO dto) {
        AziendaEntity azienda = aziendaRepo.findById(dto.getAziendaId())
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));

        return new SedeEntity(dto.getCitta(), dto.getVia(), azienda);
    }

    public List<SedeDTO> getSedi() {
        return sedeRepo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SedeDTO getSede(Long id) {
        return sedeRepo.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Sede non trovata"));
    }

    public List<SedeDTO> getSediByAzienda(Long aziendaId) {
        aziendaRepo.findById(aziendaId)
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));

        return sedeRepo.findByAzienda_Id(aziendaId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SedeDTO insertSede(SedeDTO dto) {
        SedeEntity sede = sedeRepo.save(toEntity(dto));
        return toDTO(sede);
    }
    

    public SedeDTO updateSede(SedeDTO dto) {
        SedeEntity sede = sedeRepo.findById(dto.getId())
                .orElseThrow(() -> new NoSuchElementException("Sede non trovata"));

        AziendaEntity azienda = aziendaRepo.findById(dto.getAziendaId())
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));

        sede.setCitta(dto.getCitta());
        sede.setVia(dto.getVia());
        sede.setAzienda(azienda);

        return toDTO(sedeRepo.save(sede));
    }

    public void deleteSede(Long id) {
        SedeEntity sede = sedeRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Sede non trovata"));

        if (!sede.getDipendenti().isEmpty())
            throw new RuntimeException("Impossibile eliminare la sede: ha dipendenti associati");

        sedeRepo.deleteById(id);
    }
}
