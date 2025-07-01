package com.amaro.apirestfulv1.repository;

import com.amaro.apirestfulv1.model.ProjetoSocial;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjetoSocialRepository extends JpaRepository<ProjetoSocial, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from ProjetoSocial p where p.id = :id")
    Optional<ProjetoSocial> recuperarProjetoSocialComIdLock(@Param("id") Long id);

    @Query("select p from ProjetoSocial p left outer join fetch p.categoria order by p.id")
    List<ProjetoSocial> recuperarProjetoSocialPorCategoria();

    @Query("select p from ProjetoSocial p left outer join fetch p.categoria where p.id = :id")
    Optional<ProjetoSocial> recuperarProjetoSocialPorId(@Param("id") Long id);

    @Query(value = "select p from ProjetoSocial p left outer join fetch p.categoria where p.nome like :nome order by p.id",
            countQuery = "select count(p) from ProjetoSocial p where p.nome like :nome")
    Page<ProjetoSocial> recuperarProjetosSociaisComPaginacao(Pageable pageable, @Param("nome") String nome);

    @Query("select p from ProjetoSocial p left outer join fetch p.categoria c where c.slug = :slugCategoria order by p.id")
    List<ProjetoSocial> recuperarProjetosSociaisPorSlugCategoria(@Param("slugCategoria") String slugCategoria);

    @Query("select p from ProjetoSocial p left outer join fetch p.categoria where p.id in :ids")
    List<ProjetoSocial> recuperarProjetoSocialPorArrayDeIds(@Param("ids") List<Long> ids);

    @Query(
            value = "select p from ProjetoSocial p " +
                    "left outer join fetch p.categoria c " +
                    "where c.slug = :slug " +
                    "order by p.id",
            countQuery = "select count(p) " +
                    "from ProjetoSocial p " +
                    "left outer join p.categoria c " +
                    "where c.slug = :slug "
    )
    Page<ProjetoSocial> recuperarProjetosSociaisPaginadosPorSlugDaCategoria(@Param("slug") String slug, Pageable pageable);

    @Query(
            value = "select p from ProjetoSocial p " +
                    "left outer join fetch p.categoria c " +
                    "order by p.id",
            countQuery = "select count(p) from ProjetoSocial p "
    )
    Page<ProjetoSocial> recuperarProjetosSociaisPaginados(Pageable pageable);

    @Modifying
    @Query(value = "delete from ProjetoSocial p where p.categoria.id = :id")
    void removerProjetoSocialPorIdCategoria(@Param("id") long id);
}




