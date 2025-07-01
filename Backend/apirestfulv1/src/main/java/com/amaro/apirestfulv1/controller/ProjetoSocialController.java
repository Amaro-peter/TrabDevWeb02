package com.amaro.apirestfulv1.controller;


import com.amaro.apirestfulv1.model.ProjetoSocial;
import com.amaro.apirestfulv1.model.ResultadoPaginado;
import com.amaro.apirestfulv1.service.FavoritosService;
import com.amaro.apirestfulv1.service.ProjetoSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("projetos") // http://localhost:8080/projetos
public class ProjetoSocialController {
    @Autowired
    private ProjetoSocialService projetoSocialService;

    @Autowired
    FavoritosService favoritosService;

    @GetMapping //requisição do tipo GET para http://localhost:8080/projetos
    public List<ProjetoSocial> recuperarProduto(){
        return projetoSocialService.recuperarProjetosSociais();
    }

    @GetMapping("{idProjeto}") // http://localhost:8080/projetos/idProjeto
    public ProjetoSocial recuperarProdutoPorId(@PathVariable("idProjeto") long id)  {
        return projetoSocialService.recuperarProjetoSocialPorId(id);
    }

    @GetMapping("idProjetos") // http://localhost:8080/projetos/idProjetos?idProjetos=1,2,3,4
    public List<ProjetoSocial> recuperarProjetoSocialPorArrayDeIds(@RequestParam("idProjetos") List<Long> ids) {
        return projetoSocialService.recuperarProjetoSocialPorArrayDeIds(ids);

    }

    // Entradas
    // - pagina corrente
    // - tamanho da página
    // Saídas:
    // - total de itens
    // - total de páginas
    // - pagina corrente
    // - itens da página corrente

    // Requisição do tipo GET para
    // http://localhost:8080/projetos/paginacao?pagina=0&tamanho=5

    @GetMapping("paginacao")
    public ResultadoPaginado<ProjetoSocial> recuperarProdutosComPaginicao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "5") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome
    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<ProjetoSocial> page = projetoSocialService.recuperarProjetosSociaisComPaginacao(pageable, nome);
        ResultadoPaginado<ProjetoSocial> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent()
        );
        return resultadoPaginado;
    }

    @GetMapping("categoria/paginacao")
    public ResultadoPaginado<ProjetoSocial> recuperarProdutosPaginadosPorSlugDaCategoria(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "slugCategoria", defaultValue = "") String slugCategoria
    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<ProjetoSocial> page = projetoSocialService.recuperarProjetosSociaisPaginadosPorSlugDaCategoria(slugCategoria, pageable);
        ResultadoPaginado<ProjetoSocial> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent()
        );
        return resultadoPaginado;
    }

    @GetMapping("categoria/{slugCategoria}")
    public List<ProjetoSocial> recuperarProdutosPorSlugCategoria(@PathVariable("slugCategoria") String slugCategoria) {
        return projetoSocialService.recuperarProjetosSociaisPorSlugCategoria(slugCategoria);
    }

    @PostMapping
    public ProjetoSocial cadastrarProduto(@RequestBody ProjetoSocial projetoSocial) {
        return projetoSocialService.cadastrarProjetoSocial(projetoSocial);
    }

    @GetMapping("favoritos/{idConta}")
    public List<ProjetoSocial> recuperarFavoritos(@PathVariable("idConta") Long idConta) {
        return favoritosService.recuperarFavoritos(idConta);
    }

    @PostMapping("favoritar")
    public void favoritar(@RequestBody Map<String, Object> requestBody) {
        // Extract projeto object from request body
        Map<String, Object> projetoMap = (Map<String, Object>) requestBody.get("projeto");
        Long idProjeto = Long.valueOf(projetoMap.get("id").toString());

        // Extract idConta from request body
        Long idConta = Long.valueOf(requestBody.get("idConta").toString());

        // Get the actual projeto from database
        ProjetoSocial projeto = projetoSocialService.recuperarProjetoSocialPorId(idProjeto);

        // Add to favorites
        favoritosService.adicionarFavorito(idConta, projeto);
    }

    @PutMapping
    public ProjetoSocial alterarProduto(@RequestBody ProjetoSocial projetoSocial) {
        return projetoSocialService.alterarProjetoSocial(projetoSocial);
    }

    @DeleteMapping("{idProjeto}")
    public void removerProduto(@PathVariable("idProjeto") long id) {
        projetoSocialService.removerProjetoSocial(id);
    }

    @DeleteMapping("categoria/{idCategoria}")
    public void removerProjetoSocialPorIdCategoria(@PathVariable("idCategoria") long id) {
        projetoSocialService.removerProjetoSocialPorIdCategoria(id);
    }
}
