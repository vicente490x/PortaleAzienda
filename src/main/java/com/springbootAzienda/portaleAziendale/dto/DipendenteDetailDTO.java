package com.springbootAzienda.portaleAziendale.dto;

public class DipendenteDetailDTO {

    private Long id;
    private String nome;
    private String cognome;
    private int anniEsperienza;
    private String sedeCitta;
    private String sedeVia;
    private String aziendaNome;

    public DipendenteDetailDTO(Long id, String nome, String cognome,
                                int anniEsperienza, String sedeCitta,
                                String sedeVia, String aziendaNome) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.anniEsperienza = anniEsperienza;
        this.sedeCitta = sedeCitta;
        this.sedeVia = sedeVia;
        this.aziendaNome = aziendaNome;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCognome() { return cognome; }
    public int getAnniEsperienza() { return anniEsperienza; }
    public String getSedeCitta() { return sedeCitta; }
    public String getSedeVia() { return sedeVia; }
    public String getAziendaNome() { return aziendaNome; }
}