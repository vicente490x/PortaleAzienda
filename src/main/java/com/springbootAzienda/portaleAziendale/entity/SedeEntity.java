package com.springbootAzienda.portaleAziendale.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "sedi")
public class SedeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String citta;
    private String via;

    @ManyToOne
    @JoinColumn(name = "azienda_id", nullable = false)
    private AziendaEntity azienda;

    @OneToMany(mappedBy = "sede")
    private List<DipendenteEntity> dipendenti = new ArrayList<>();

    public SedeEntity() {}

    

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCitta() { return citta; }
    public void setCitta(String citta) { this.citta = citta; }

    public String getVia() { return via; }
    public void setVia(String via) { this.via = via; }

    public AziendaEntity getAzienda() { return azienda; }
    public void setAzienda(AziendaEntity azienda) { this.azienda = azienda; }

    public List<DipendenteEntity> getDipendenti() { return dipendenti; }
    public void setDipendenti(List<DipendenteEntity> dipendenti) { this.dipendenti = dipendenti; }
}
