package com.springbootAzienda.portaleAziendale.dto;

public class DipendenteDTO {

    private Long id;
    private String nome;
    private String cognome;
    private int anniEsperienza;

    private Long sedeId;
    private String sedeCitta;

    public DipendenteDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCognome() { return cognome; }
    public void setCognome(String cognome) { this.cognome = cognome; }

    public int getAnniEsperienza() { return anniEsperienza; }
    public void setAnniEsperienza(int anniEsperienza) { this.anniEsperienza = anniEsperienza; }

    public Long getSedeId() { return sedeId; }
    public void setSedeId(Long sedeId) { this.sedeId = sedeId; }

    public String getSedeCitta() { return sedeCitta; }
    public void setSedeCitta(String sedeCitta) { this.sedeCitta = sedeCitta; }
}
