import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import type ResultadoPaginado from "../interface/ResultadoPaginado";
import isErrorResponse from "../util/isErrorResponse";


interface QueryString {
    tamanho: string;
    slugCategoria?: string;
}

interface QueryStringComPagina {
    pagina: string;
    tamanho: string;
    slugCategoria?: string;
}

const useRecuperarProjetosSociasPorSlugCategoriaComPaginacao = (queryString: QueryString) => {
    const recuperarProjetosSociasPorSlugCategoriaComPaginacao = 
        async (queryStringComPagina: QueryStringComPagina): Promise<ResultadoPaginado<ProjetoSocial>> => {
            const response = await fetch("http://localhost:8080/projetos/categoria/paginacao?" + 
                new URLSearchParams({
                    ...queryStringComPagina
                })
            );

            if(!response.ok) {
                const error: any = await response.json();
                if(isErrorResponse(error)) {
                    throw error;
                } else {
                    throw new Error("Ocorreu um erro ao recuperar os produtos por slug da categoria com paginação.Status code = "
                        + response.status
                    );
                }
            }

            return await response.json();
    };

    return useInfiniteQuery({
        queryKey: ["projetos", "categoria", "paginacao", queryString],
        queryFn: ({ pageParam }) => recuperarProjetosSociasPorSlugCategoriaComPaginacao({
            pagina: pageParam.toString(),
            ...queryString
        }),
        staleTime: 0,
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.paginaCorrente < lastPage.totalDePaginas - 1 ? lastPage.paginaCorrente + 1 : undefined;
        }
    });
};

export default useRecuperarProjetosSociasPorSlugCategoriaComPaginacao;