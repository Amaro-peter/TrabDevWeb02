package com.amaro.apirestfulv1.controller;


import com.amaro.apirestfulv1.model.Usuario;
import com.amaro.apirestfulv1.service.AutenticacaoService;
import com.amaro.apirestfulv1.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("autenticacao") //http://localhost:8080/autenticacao
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PostMapping("login") //http://localhost:8080/autenticacao/login
    public TokenResponse login(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return new TokenResponse(usuarioLogado.getId(), usuarioLogado.getRole());
        } else {

            return new TokenResponse(0, "");
        }
    }

    @PostMapping("cadastrar") //http://localhost:8080/autenticacao/cadastrar
    public TokenResponse cadastrar(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.cadastrarUsuario(usuario);
        if (usuarioLogado != null) {
            return new TokenResponse(usuarioLogado.getId(), usuarioLogado.getRole());
        } else {
            return new TokenResponse(0, "");
        }
    }
}
