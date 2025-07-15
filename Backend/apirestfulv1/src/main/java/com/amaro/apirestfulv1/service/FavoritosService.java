package com.amaro.apirestfulv1.service;

import com.amaro.apirestfulv1.model.ProjetoSocial;
import com.amaro.apirestfulv1.model.Usuario;
import com.amaro.apirestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoritosService{
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public void adicionarFavorito(Long idUsuario, ProjetoSocial projeto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (!usuario.getFavoritos().contains(projeto)) {
            usuario.getFavoritos().add(projeto);
        }
    }

    @Transactional
    public void removerFavorito(Long idUsuario, Long idProjeto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        boolean removido = usuario.getFavoritos().removeIf(p -> p.getId().equals(idProjeto));
    }

    public List<ProjetoSocial> recuperarFavoritos(Long idUsuario) {
        return usuarioRepository.findFavoritosByUsuarioId(idUsuario);
    }
}
