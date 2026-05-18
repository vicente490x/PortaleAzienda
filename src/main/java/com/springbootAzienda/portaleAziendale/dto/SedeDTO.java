package com.springbootAzienda.portaleAziendale.dto;

public class SedeDTO {

    private Long id;
    private String citta;
    private String via;

    private Long aziendaId;
    private String aziendaNome;

    public SedeDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCitta() { return citta; }
    public void setCitta(String citta) { this.citta = citta; }

    public String getVia() { return via; }
    public void setVia(String via) { this.via = via; }

    public Long getAziendaId() { return aziendaId; }
    public void setAziendaId(Long aziendaId) { this.aziendaId = aziendaId; }

    public String getAziendaNome() { return aziendaNome; }
    public void setAziendaNome(String aziendaNome) { this.aziendaNome = aziendaNome; }
}
