package com.springbootAzienda.portaleAziendale.service;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.springbootAzienda.portaleAziendale.dto.ProgettoDTO;
import com.springbootAzienda.portaleAziendale.entity.DipendenteEntity;
import com.springbootAzienda.portaleAziendale.entity.ProgettoEntity;
import com.springbootAzienda.portaleAziendale.repository.AziendaRepository;
import com.springbootAzienda.portaleAziendale.repository.DipendenteRepository;
import com.springbootAzienda.portaleAziendale.repository.ProgettoRepository; 


@Service
public class ProgettoService {

    private final ProgettoRepository progettoRepo;
    private final DipendenteRepository dipendenteRepo;
    private final AziendaRepository aziendaRepo;

    public ProgettoService(ProgettoRepository progettoRepo,
                           DipendenteRepository dipendenteRepo,
                           AziendaRepository aziendaRepo) {
        this.progettoRepo = progettoRepo;
        this.dipendenteRepo = dipendenteRepo;
        this.aziendaRepo = aziendaRepo;
    }

    /* -------------------- MAPPING -------------------- */

    private ProgettoDTO toDTO(ProgettoEntity p) {
        ProgettoDTO dto = new ProgettoDTO();
        dto.setId(p.getId());
        dto.setNome(p.getNome());
        dto.setDurataGiorni(p.getDurataGiorni());
        dto.setCliente(p.getCliente());
        dto.setDipendentiIds(
            p.getDipendenti().stream()
                .map(DipendenteEntity::getId)
                .collect(Collectors.toList())
        );
        return dto;
    }

    private Set<DipendenteEntity> resolveDipendenti(List<Long> ids) {
        if (ids == null || ids.isEmpty()) return new HashSet<>();
        return ids.stream()
                .map(id -> dipendenteRepo.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Dipendente non trovato: " + id)))
                .collect(Collectors.toSet());
    }

    /* -------------------- GET -------------------- */

    public List<ProgettoDTO> getProgetti() {
        return progettoRepo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProgettoDTO getProgetto(Long id) {
        return progettoRepo.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Progetto non trovato"));
    }

    public List<ProgettoDTO> getProgettiByAzienda(Long aziendaId) {
        aziendaRepo.findById(aziendaId)
                .orElseThrow(() -> new NoSuchElementException("Azienda non trovata"));

        return progettoRepo.findByAziendaId(aziendaId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProgettoDTO> getProgettiByNome(String nome) {
        return progettoRepo.findByNomeContainingIgnoreCase(nome).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProgettoDTO> getProgettiByDipendente(Long dipendenteId) {
        dipendenteRepo.findById(dipendenteId)
                .orElseThrow(() -> new NoSuchElementException("Dipendente non trovato"));

        return progettoRepo.findAll().stream()
                .filter(p -> p.getDipendenti().stream()
                        .anyMatch(d -> d.getId().equals(dipendenteId)))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /* -------------------- INSERT -------------------- */

    public ProgettoDTO insertProgetto(ProgettoDTO dto) {

        ProgettoEntity p = new ProgettoEntity(
                dto.getNome(),
                dto.getDurataGiorni(),
                dto.getCliente()
        );

        p.setDipendenti(resolveDipendenti(dto.getDipendentiIds()));

        return toDTO(progettoRepo.save(p));
    }

    /* -------------------- UPDATE -------------------- */

    public ProgettoDTO updateProgetto(ProgettoDTO dto) {

        ProgettoEntity p = progettoRepo.findById(dto.getId())
                .orElseThrow(() -> new NoSuchElementException("Progetto non trovato"));

        p.setNome(dto.getNome());
        p.setDurataGiorni(dto.getDurataGiorni());
        p.setCliente(dto.getCliente());

        if (dto.getDipendentiIds() != null)
            p.setDipendenti(resolveDipendenti(dto.getDipendentiIds()));

        return toDTO(progettoRepo.save(p));
    }

    /* -------------------- DELETE -------------------- */

    public void deleteProgetto(Long id) {
        ProgettoEntity p = progettoRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Progetto non trovato"));

        p.getDipendenti().clear();
        progettoRepo.save(p);

        progettoRepo.delete(p);
    }
}
