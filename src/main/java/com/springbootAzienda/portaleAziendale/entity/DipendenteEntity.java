package com.springbootAzienda.portaleAziendale.entity;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "dipendenti")
public class DipendenteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cognome;
    private int anniEsperienza;

    @ManyToOne
    @JoinColumn(name = "sede_id", nullable = false)
    private SedeEntity sede;

    @ManyToMany(mappedBy = "dipendenti")
    private Set<ProgettoEntity> progetti = new HashSet<>();

    public DipendenteEntity() {}

    public DipendenteEntity(String nome, String cognome, int anniEsperienza, SedeEntity sede) {
        this.nome = nome;
        this.cognome = cognome;
        this.anniEsperienza = anniEsperienza;
        this.sede = sede;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCognome() { return cognome; }
    public void setCognome(String cognome) { this.cognome = cognome; }

    public int getAnniEsperienza() { return anniEsperienza; }
    public void setAnniEsperienza(int anniEsperienza) { this.anniEsperienza = anniEsperienza; }

    public SedeEntity getSede() { return sede; }
    public void setSede(SedeEntity sede) { this.sede = sede; }

    public Set<ProgettoEntity> getProgetti() { return progetti; }
    public void setProgetti(Set<ProgettoEntity> progetti) { this.progetti = progetti; }

    /* --- equals & hashCode basati su ID --- */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DipendenteEntity)) return false;
        DipendenteEntity that = (DipendenteEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    /* --- toString utile per debug --- */
    @Override
    public String toString() {
        return nome + " " + cognome + " (ID: " + id + ")";
    }
}
