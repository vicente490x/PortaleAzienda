package com.springbootAzienda.portaleAziendale.dto;

import java.util.List;

public class ProgettoDTO {

    private Long id;
    private String nome;
    private int durataGiorni;
    private String cliente;
    private List<Long> dipendentiIds;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getDurataGiorni() { return durataGiorni; }
    public void setDurataGiorni(int durataGiorni) { this.durataGiorni = durataGiorni; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public List<Long> getDipendentiIds() { return dipendentiIds; }
    public void setDipendentiIds(List<Long> dipendentiIds) { this.dipendentiIds = dipendentiIds; }
}