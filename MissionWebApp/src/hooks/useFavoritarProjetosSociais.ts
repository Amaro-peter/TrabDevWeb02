import { useMutation } from "@tanstack/react-query";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import isErrorResponse from "../util/isErrorResponse";
import queryClient from "../main";


const favoritarProjetosSociais = async ({ projeto, idConta }: { projeto: ProjetoSocial, idConta: Number }) => {
    const response = await fetch("http://localhost:8080/projetos/favoritar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ projeto, idConta }),
    });
    if(!response.ok) {
        const error: any = await response.json();
        if(isErrorResponse(error)) {
            throw error;
        }
        else {
            throw new Error("Erro ao favoritar produto. Status code = " + response.status);
        }
    }
};


const useFavoritarProjetosSociais = () => {
    return useMutation({
        mutationFn: favoritarProjetosSociais,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projetosSociaisFavoritados"]
            })
        }
    });
};

export default useFavoritarProjetosSociais;