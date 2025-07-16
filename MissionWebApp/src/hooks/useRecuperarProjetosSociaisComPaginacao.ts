import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import type { ResultadoPaginado } from "../interface/ResultadoPaginado";
import isErrorResponse from "../util/isErrorResponse";


interface QueryString {
    pagina: string;
    tamanho: string;
    nome: string;
}

const useRecuperarProjetosSociaisComPaginacao = (queryString: QueryString) => {
    const recuperarProjetoSociaisComPaginacao = async (queryString: QueryString): Promise<ResultadoPaginado<ProjetoSocial>> => {
        const response = await fetch("http://localhost:8080/projetos/paginacao?" + new URLSearchParams({ ...queryString }));

        if(!response.ok) {
            const error: any = await response.json();
            if(isErrorResponse(error)) {
                throw error;
            } else {
                throw new Error("Erro desconhecido ao recuperar projetos sociais com paginação. Status: " + response.status);
            }
        }

        return await response.json();
    }

    return useQuery({
        queryKey: ["projetosSociais", "paginacao", queryString],
        queryFn: () => recuperarProjetoSociaisComPaginacao(queryString),
        staleTime: 10_000,
        placeholderData: keepPreviousData,
    });
};

export default useRecuperarProjetosSociaisComPaginacao;