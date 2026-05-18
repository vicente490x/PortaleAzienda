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

import com.springbootAzienda.portaleAziendale.dto.SedeDTO;
import com.springbootAzienda.portaleAziendale.service.SedeService;

@RestController
@RequestMapping("/sede")
public class SedeController {

    private final SedeService service;

    public SedeController(SedeService service) {
        this.service = service;
    }

    @GetMapping("/lista")
    public List<SedeDTO> getSedi() {
        return service.getSedi();
    }

    @GetMapping("/{id}")
    public SedeDTO getSede(@PathVariable Long id) {
        return service.getSede(id);
    }

    @GetMapping("/azienda/{aziendaId}")
    public List<SedeDTO> getSediByAzienda(@PathVariable Long aziendaId) {
        return service.getSediByAzienda(aziendaId);
    }

    @PostMapping("/insert")
    public SedeDTO insertSede(@RequestBody SedeDTO dto) {
        return service.insertSede(dto);
    }

    @PutMapping("/update")
    public SedeDTO updateSede(@RequestBody SedeDTO dto) {
        return service.updateSede(dto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSede(@PathVariable Long id) {
        service.deleteSede(id);
    }
}
