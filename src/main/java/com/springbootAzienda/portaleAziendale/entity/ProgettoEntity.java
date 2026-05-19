package com.springbootAzienda.portaleAziendale.entity;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "progetti")
public class ProgettoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private int durataGiorni;
    private String cliente;

    @ManyToMany
    @JoinTable(
        name = "dipendente_progetto",
        joinColumns = @JoinColumn(name = "progetto_id"),
        inverseJoinColumns = @JoinColumn(name = "dipendente_id")
    )
    private Set<DipendenteEntity> dipendenti = new HashSet<>();

    public ProgettoEntity() {}

    public ProgettoEntity(String nome, int durataGiorni, String cliente) {
        this.nome = nome;
        this.durataGiorni = durataGiorni;
        this.cliente = cliente;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public int getDurataGiorni() { return durataGiorni; }
    public String getCliente() { return cliente; }
    public Set<DipendenteEntity> getDipendenti() { return dipendenti; }

    public void setId(Long id) { this.id = id; }
    public void setNome(String nome) { this.nome = nome; }
    public void setDurataGiorni(int durataGiorni) { this.durataGiorni = durataGiorni; }
    public void setCliente(String cliente) { this.cliente = cliente; }
    public void setDipendenti(Set<DipendenteEntity> dipendenti) { this.dipendenti = dipendenti; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProgettoEntity)) return false;
        ProgettoEntity that = (ProgettoEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
