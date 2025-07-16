package com.amaro.apirestfulv1.service;

import com.amaro.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.amaro.apirestfulv1.model.ProjetoSocial;
import com.amaro.apirestfulv1.repository.ProjetoSocialRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetoSocialService {

    @Autowired
    private ProjetoSocialRepository projetoSocialRepository;

    public List<ProjetoSocial> recuperarProjetosSociais() {
        return projetoSocialRepository.recuperarProjetoSocialPorCategoria();
    }

    public ProjetoSocial recuperarProjetoSocialPorId(Long id)  {
        return projetoSocialRepository.recuperarProjetoSocialPorId(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Projeto Numero " + id + " nao encontrado."));
    }

    public List<ProjetoSocial> recuperarProjetoSocialPorArrayDeIds(List<Long> ids) {
        return projetoSocialRepository.recuperarProjetoSocialPorArrayDeIds(ids);
    }

    public Page<ProjetoSocial> recuperarProjetosSociaisComPaginacao(Pageable pageable, String nome) {
        return projetoSocialRepository.recuperarProjetosSociaisComPaginacao(pageable, "%" + nome + "%");
    }

    public Page<ProjetoSocial> recuperarProjetosSociaisPaginadosPorSlugDaCategoria(String slugCategoria, Pageable pageable) {
        if(!slugCategoria.isEmpty()) {
            return projetoSocialRepository.recuperarProjetosSociaisPaginadosPorSlugDaCategoria(slugCategoria, pageable);
        } else {
            return projetoSocialRepository.recuperarProjetosSociaisPaginados(pageable);
        }
    }

    public List<ProjetoSocial> recuperarProjetosSociaisPorSlugCategoria(String slugCategoria) {
        return projetoSocialRepository.recuperarProjetosSociaisPorSlugCategoria(slugCategoria);
    }

    public ProjetoSocial cadastrarProjetoSocial(ProjetoSocial projetoSocial) {
        return projetoSocialRepository.save(projetoSocial);
    }

    @Transactional
    public ProjetoSocial alterarProjetoSocial(ProjetoSocial projetoSocial) throws EntidadeNaoEncontradaException {
        Optional<ProjetoSocial> opt = projetoSocialRepository.recuperarProjetoSocialComIdLock(projetoSocial.getId());
        if(opt.isPresent()) {
            return projetoSocialRepository.save(projetoSocial);
        }

        throw new EntidadeNaoEncontradaException("Projeto inexistente");
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerProjetoSocial(Long id) {

        projetoSocialRepository.deleteById(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerProjetoSocialPorIdCategoria(Long id) {
        projetoSocialRepository.removerProjetoSocialPorIdCategoria(id);
    }

}
