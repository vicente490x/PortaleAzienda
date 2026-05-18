package com.springbootAzienda.portaleAziendale.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.springbootAzienda.portaleAziendale.dto.DipendenteDTO;
import com.springbootAzienda.portaleAziendale.entity.DipendenteEntity;
import com.springbootAzienda.portaleAziendale.entity.SedeEntity;
import com.springbootAzienda.portaleAziendale.repository.DipendenteRepository;
import com.springbootAzienda.portaleAziendale.repository.SedeRepository;

@Service
public class DipendenteService {

    private final DipendenteRepository dipendenteRepo;
    private final SedeRepository sedeRepo;

    public DipendenteService(DipendenteRepository dipendenteRepo, SedeRepository sedeRepo) {
        this.dipendenteRepo = dipendenteRepo;
        this.sedeRepo = sedeRepo;
    }

    private DipendenteDTO toDTO(DipendenteEntity d) {
        DipendenteDTO dto = new DipendenteDTO();
        dto.setId(d.getId());
        dto.setNome(d.getNome());
        dto.setCognome(d.getCognome());
        dto.setAnniEsperienza(d.getAnniEsperienza());
        dto.setSedeId(d.getSede().getId());
        dto.setSedeCitta(d.getSede().getCitta());
        return dto;
    }

    private DipendenteEntity toEntity(DipendenteDTO dto) {
        SedeEntity sede = sedeRepo.findById(dto.getSedeId())
                .orElseThrow(() -> new NoSuchElementException("Sede non trovata"));

        return new DipendenteEntity(
                dto.getNome(),
                dto.getCognome(),
                dto.getAnniEsperienza(),
                sede
        );
    }

    public List<DipendenteDTO> getDipendenti() {
        return dipendenteRepo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DipendenteDTO getDipendente(Long id) {
        return dipendenteRepo.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Dipendente non trovato"));
    }

    public List<DipendenteDTO> getDipendentiBySede(Long sedeId) {
        sedeRepo.findById(sedeId)
                .orElseThrow(() -> new NoSuchElementException("Sede non trovata"));

        return dipendenteRepo.findBySede_Id(sedeId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DipendenteDTO insertDipendente(DipendenteDTO dto) {
        DipendenteEntity saved = dipendenteRepo.save(toEntity(dto));
        return toDTO(saved);
    }

    public List<DipendenteDTO> insertListDipendenti(List<DipendenteDTO> dtos) {
        return dtos.stream()
                .map(this::insertDipendente)
                .collect(Collectors.toList());
    }

    public DipendenteDTO updateDipendente(DipendenteDTO dto) {
        DipendenteEntity d = dipendenteRepo.findById(dto.getId())
                .orElseThrow(() -> new NoSuchElementException("Dipendente non trovato"));

        SedeEntity nuovaSede = sedeRepo.findById(dto.getSedeId())
                .orElseThrow(() -> new NoSuchElementException("Sede non trovata"));

        d.setNome(dto.getNome());
        d.setCognome(dto.getCognome());
        d.setAnniEsperienza(dto.getAnniEsperienza());
        d.setSede(nuovaSede);

        return toDTO(dipendenteRepo.save(d));
    }

    public void deleteDipendente(Long id) {
        dipendenteRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Dipendente non trovato"));

        dipendenteRepo.deleteById(id);
    }
}
