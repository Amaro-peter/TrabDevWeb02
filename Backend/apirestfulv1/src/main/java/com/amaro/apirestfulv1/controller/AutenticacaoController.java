package com.amaro.apirestfulv1.controller;


import com.amaro.apirestfulv1.model.Usuario;
import com.amaro.apirestfulv1.service.AutenticacaoService;
import com.amaro.apirestfulv1.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("autenticacao") //http://localhost:8080/autenticacao
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
        allowedHeaders = "*",
        allowCredentials = "true"
)
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
    public Boolean cadastrar(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.cadastrarUsuario(usuario);
        if (usuarioLogado != null) {
            return true;
        } else {
            return false;
        }
    }
}
