import { useQuery } from "@tanstack/react-query";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import isErrorResponse from "../util/isErrorResponse";


const useRecuperarProjetosSociaisPorIdCarrinho = (idProjetos: number[]) => {
    const recuperarProjetosSociaisPorIdCarrinho = async (ids: number[]): Promise<ProjetoSocial[]> => {
        const response = await fetch("http://localhost:8080/projetos/idProjetos?" + 
        new URLSearchParams({
            idProjetos: ids.join(",")
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

    return useQuery({
        queryKey: ["projetosSociais", "carrinho", idProjetos],
        queryFn: ({ queryKey }) => {
            const [, , idProjetosFromKey] = queryKey as [string, string, number[]];
            return recuperarProjetosSociaisPorIdCarrinho(idProjetosFromKey);
        },
        staleTime: 0,
    });
}

export default useRecuperarProjetosSociaisPorIdCarrinho;