import { useEffect, useState } from "react";
import useProjetoSocialStore from "../store/useProjetoSocialStore";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import { useParams } from "react-router-dom";
import useRecuperarProjetosSociasPorSlugCategoriaComPaginacao from "../hooks/useRecuperarProjetosSociasPorSlugCategoriaComPaginacao";
import Card from "../components/Card";
import useFavoritarProjetosSociais from "../hooks/useFavoritarProjetosSociais";


export interface ProjetoCarrinho {
    idProjeto: number;
    quantidade: number;
}

const CardsPorSlugCategoria = () => {
    const tamanho = useProjetoSocialStore((s) => s.tamanho);

    const[carrinho, setCarrinho] = useState(() => {
        const itensDeCarrinho = localStorage.getItem("carrinho");
        return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }, [carrinho]);

    function adicionarProjetoSocial(projeto: ProjetoSocial) {
        setCarrinho((prevCarrinho: ProjetoCarrinho[]) => {
            const existe = prevCarrinho.find((item) => item.idProjeto === projeto.id);
            if (existe) {
                const novoCarrinho: ProjetoCarrinho[] = prevCarrinho.map((item: ProjetoCarrinho) => item.idProjeto === projeto.id ?
                    { idProjeto: item.idProjeto, quantidade: item.quantidade + 1 } : item);
                return novoCarrinho;
            }
            else {
                return [...prevCarrinho, { idProjeto: projeto.id, quantidade: 1 }];
            }
        });
    }

    const subtrairProjetoSocial = (projeto: ProjetoSocial) => {
        setCarrinho((prevCarrinho: ProjetoCarrinho[]) => {
            const existe = prevCarrinho.find((item: ProjetoCarrinho) => item.idProjeto === projeto.id);
            if(existe) {
                const novoCarrinho: ProjetoCarrinho[] = prevCarrinho.map((item: ProjetoCarrinho) => item.idProjeto === projeto.id ?
                    {idProjeto: item.idProjeto, quantidade: item.quantidade - 1} : item);
                return novoCarrinho.filter((item: ProjetoCarrinho) => item.quantidade > 0);
            }
            else {
                throw new Error("Erro ao subtrair 1 de projeto social que não existe no carrinho.");
            }
        });
    };

    const { mutate: favoritarProjetoSocialMutate, error: errorFavoritarProjetoSocial } = useFavoritarProjetosSociais();

    const favoritarProjetoSocial = (projeto: ProjetoSocial, idConta: Number) => {
        favoritarProjetoSocialMutate({ projeto, idConta });
    }

    const { slugCategoria } = useParams();

    const {
        data,
        isPending: carregandoProjetos,
        error: errorProjetos,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useRecuperarProjetosSociasPorSlugCategoriaComPaginacao({
        tamanho: tamanho.toString(),
        slugCategoria: slugCategoria ? slugCategoria : "",
    });

    if(carregandoProjetos) {
        return (
            <h5>
                Carregando projetos sociais...
            </h5>
        );
    }

    if(errorProjetos) {
        throw errorProjetos;
    }

    if(errorFavoritarProjetoSocial) {
        throw errorFavoritarProjetoSocial;
    }

    const projetosNoCarrinho: (ProjetoCarrinho | null)[] = [];

    data.pages.forEach((page) => {
        page.itens.forEach((projeto) => {
            const projCarrinho = carrinho.find((item: ProjetoCarrinho) => item.idProjeto === projeto.id);
            projetosNoCarrinho.push(projCarrinho ? projCarrinho : null);
        });
    });

    return (
        <>
            <div className="row">
                {data.pages.map((page, pagina) =>
                    page.itens.map((projeto, index) => (
                        <div key={projeto.id} className="col-md-4 col-12 mb-4">
                            <Card 
                            projeto= {projeto} 
                            projetosNoCarrinho= {projetosNoCarrinho[pagina * tamanho + index]}
                            adicionarProjetoSocial = {adicionarProjetoSocial}
                            subtrairProjetoSocial = {subtrairProjetoSocial}
                            favoritarProjetoSocial={favoritarProjetoSocial}
                            />
                        </div>
                    ))
                )} 
            </div>
            {hasNextPage && (
                <div className="d-flex justify-content-center">
                    <button
                        onClick={() => fetchNextPage()}
                        className="btn btn-custom mb-5 w-50"
                    >
                        {isFetchingNextPage ? "Recuperando" : "Carregar mais..."}
                    </button>
                </div>
            )}
        </>
    );

};

export default CardsPorSlugCategoria;