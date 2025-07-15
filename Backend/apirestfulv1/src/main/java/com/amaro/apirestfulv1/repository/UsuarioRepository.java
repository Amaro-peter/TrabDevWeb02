package com.amaro.apirestfulv1.repository;

import com.amaro.apirestfulv1.model.ProjetoSocial;
import com.amaro.apirestfulv1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByContaAndSenha(String conta, String senha);

    Usuario findByConta(String conta);

    @Query("SELECT u.favoritos FROM Usuario u WHERE u.id = :idUsuario")
    List<ProjetoSocial> findFavoritosByUsuarioId(@Param("idUsuario") Long idUsuario);
}
