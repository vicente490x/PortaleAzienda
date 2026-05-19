package com.springbootAzienda.portaleAziendale.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbootAzienda.portaleAziendale.dto.DipendenteDTO;
import com.springbootAzienda.portaleAziendale.dto.DipendenteDetailDTO;
import com.springbootAzienda.portaleAziendale.service.DipendenteService;

@RestController
@RequestMapping("/dipendente")
public class DipendenteController {

    private final DipendenteService service;

    public DipendenteController(DipendenteService service) {
        this.service = service;
    }

    @GetMapping("/lista")
    public List<DipendenteDTO> getDipendenti() {
        return service.getDipendenti();
    }

    @GetMapping("/{id}")
    public DipendenteDTO getDipendente(@PathVariable Long id) {
        return service.getDipendente(id);
    }

    @GetMapping("/sede/{sedeId}")
    public List<DipendenteDetailDTO> getDipendentiBySede(@PathVariable Long sedeId) {
        return service.getDipendentiBySede(sedeId);
    }

    @PostMapping("/insert")
    public DipendenteDTO insertDipendente(@RequestBody DipendenteDTO dto) {
        return service.insertDipendente(dto);
    }

    @PostMapping("/insertMultiple")
    public List<DipendenteDTO> insertListDipendenti(@RequestBody List<DipendenteDTO> dtos) {
        return service.insertListDipendenti(dtos);
    }

    @PutMapping("/update")
    public DipendenteDTO updateDipendente(@RequestBody DipendenteDTO dto) {
        return service.updateDipendente(dto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDipendente(@PathVariable Long id) {
        service.deleteDipendente(id);
    }
}
