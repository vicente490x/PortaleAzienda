package com.springbootAzienda.portaleAziendale.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "aziende")
public class AziendaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String pIva;

    @OneToMany(mappedBy = "azienda")
    private List<SedeEntity> sedi = new ArrayList<>();

    public AziendaEntity() {}


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getPIva() { return pIva; }
    public void setPIva(String pIva) { this.pIva = pIva; }

    public List<SedeEntity> getSedi() { return sedi; }
    public void setSedi(List<SedeEntity> sedi) { this.sedi = sedi; }
}
