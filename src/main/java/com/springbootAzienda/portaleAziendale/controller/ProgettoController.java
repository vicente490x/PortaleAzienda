package com.springbootAzienda.portaleAziendale.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springbootAzienda.portaleAziendale.dto.ProgettoDTO;
import com.springbootAzienda.portaleAziendale.service.ProgettoService;

@RestController
@RequestMapping("/progetto")
public class ProgettoController {

    private final ProgettoService service;

    public ProgettoController(ProgettoService service) {
        this.service = service;
    }

    // lista completa
    @GetMapping("/lista")
    public List<ProgettoDTO> getProgetti() {
        return service.getProgetti();
    }

    // singolo per id
    @GetMapping("/{id}")
    public ProgettoDTO getProgetto(@PathVariable Long id) {
        return service.getProgetto(id);
    }

    // progetti di un'azienda
    @GetMapping("/azienda/{aziendaId}")
    public List<ProgettoDTO> getProgettiByAzienda(@PathVariable Long aziendaId) {
        return service.getProgettiByAzienda(aziendaId);
    }

    // filtra per nome (progetto/search?nome=alpha)
    @GetMapping("/search")
    public List<ProgettoDTO> getProgettiByNome(@RequestParam String nome) {
        return service.getProgettiByNome(nome);
    }

    // progetti di un dipendente
    @GetMapping("/dipendente/{dipendenteId}")
    public List<ProgettoDTO> getProgettiByDipendente(@PathVariable Long dipendenteId) {
        return service.getProgettiByDipendente(dipendenteId);
    }

    // insert
    @PostMapping("/insert")
    public ProgettoDTO insertProgetto(@RequestBody ProgettoDTO dto) {
        return service.insertProgetto(dto);
    }

    // update
    @PutMapping("/update")
    public ProgettoDTO updateProgetto(@RequestBody ProgettoDTO dto) {
        return service.updateProgetto(dto);
    }

    // delete
    @DeleteMapping("/delete/{id}")
    public void deleteProgetto(@PathVariable Long id) {
        service.deleteProgetto(id);
    }
}