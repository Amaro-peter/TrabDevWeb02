package com.amaro.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    private String conta;
    private String senha;

    @ManyToMany
    @JoinTable(
            name = "usuario_favoritos",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "projeto_id")
    )
    private List<ProjetoSocial> favoritos = new ArrayList<>();

    public Usuario(String role, String conta, String senha) {
        this.role = role;
        this.conta = conta;
        this.senha = senha;
        this.favoritos = new ArrayList<>();
    }
}
