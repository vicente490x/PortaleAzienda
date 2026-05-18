package com.springbootAzienda.portaleAziendale.dto;

public class AziendaDTO {

    private Long id;
    private String nome;
    private String pIva;

    public AziendaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getPIva() { return pIva; }
    public void setPIva(String pIva) { this.pIva = pIva; }
}
