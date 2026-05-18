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

import com.springbootAzienda.portaleAziendale.dto.AziendaDTO;
import com.springbootAzienda.portaleAziendale.service.AziendaService;

@RestController
@RequestMapping("/azienda")
public class AziendaController {

    private final AziendaService service;

    public AziendaController(AziendaService service) {
        this.service = service;
    }

    @GetMapping("/lista")
    public List<AziendaDTO> getAziende() {
        return service.getAziende();
    }

    @GetMapping("/{id}")
    public AziendaDTO getAzienda(@PathVariable Long id) {
        return service.getAzienda(id);
    }

    @PostMapping("/insert")
    public AziendaDTO insertAzienda(@RequestBody AziendaDTO dto) {
        return service.insertAzienda(dto);
    }

    @PutMapping("/update")
    public AziendaDTO updateAzienda(@RequestBody AziendaDTO dto) {
        return service.updateAzienda(dto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAzienda(@PathVariable Long id) {
        service.deleteAzienda(id);
    }
}
