package com.amaro.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class ProjetoSocial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imagem;
    private String nome;
    private String slug;
    private String descricao;
    private boolean ativo;
    private String responsavel;
    private String contato;
    private BigDecimal doacao;
    private LocalDate dataInicio;

    @ManyToOne
    private Categoria categoria;

    @JsonIgnore
    @ManyToMany(mappedBy = "favoritos")
    private List<Usuario> usuariosFavoritaram = new ArrayList<>();

    public ProjetoSocial(String imagem, String nome, String slug, String descricao,
                         boolean ativo, String responsavel, String contato, BigDecimal doacao, LocalDate dataInicio, Categoria categoria) {
        this.imagem = imagem;
        this.nome = nome;
        this.slug = slug;
        this.descricao = descricao;
        this.ativo = ativo;
        this.responsavel = responsavel;
        this.contato = contato;
        this.doacao = doacao;
        this.dataInicio = dataInicio;
        this.categoria = categoria;
    }
}
