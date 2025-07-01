package com.amaro.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String slug;

    @JsonIgnore // ignora o arquivo JSON, dado que este causa uma recursão quando acessado pelo Spring Boot
    @OneToMany(mappedBy = "categoria") //Associação da classe Categoria (List<Produto>) na classe Produto (Categoria categoria)
    private List<ProjetoSocial> projetoSociais;

    public Categoria(String nome, String slug) {
        this.nome = nome;
        this.slug = slug;
    }
}
