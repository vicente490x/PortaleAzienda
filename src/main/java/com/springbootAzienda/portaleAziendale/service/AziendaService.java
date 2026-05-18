package com.springbootAzienda.portaleAziendale.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.springbootAzienda.portaleAziendale.dto.AziendaDTO;
import com.springbootAzienda.portaleAziendale.entity.AziendaEntity;
import com.springbootAzienda.portaleAziendale.repository.AziendaRepository;

@Service
public class AziendaService {

    private final AziendaRepository repo;

    public AziendaService(AziendaRepository repo) {
        this.repo = repo;
    }

    private AziendaDTO toDTO(AziendaEntity a) {
        AziendaDTO dto = new AziendaDTO();
        dto.setId(a.getId());
        dto.setNome(a.getNome());
        dto.setPIva(a.getPIva());
        return dto;
    }
    
    private AziendaEntity toEntity(AziendaDTO dto) {
        return new AziendaEntity(dto.getNome(), dto.getPIva());
    }
    

    public List<AziendaDTO> getAziende() {
        return repo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AziendaDTO getAzienda(Long id) {
        return repo.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));
    }

    public AziendaDTO insertAzienda(AziendaDTO dto) {
        AziendaEntity a = new AziendaEntity(dto.getNome(), dto.getPIva());
        return toDTO(repo.save(a));
    }

    public AziendaDTO updateAzienda(AziendaDTO dto) {
        AziendaEntity a = repo.findById(dto.getId())
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));

        a.setNome(dto.getNome());
        a.setPIva(dto.getPIva());

        return toDTO(repo.save(a));
    }

    public void deleteAzienda(Long id) {
        AziendaEntity a = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));

        if (!a.getSedi().isEmpty())
            throw new RuntimeException("Impossibile eliminare l'azienda: ha sedi associate");

        repo.deleteById(id);
    }
}
