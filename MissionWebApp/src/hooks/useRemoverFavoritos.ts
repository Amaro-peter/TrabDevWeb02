import { useMutation } from "@tanstack/react-query";
import isErrorResponse from "../util/isErrorResponse";
import queryClient from "../main";


const removerFavoritos = async ({ idUsuario, idProjeto }: {idUsuario: number, idProjeto: number}) => {
    const response = await fetch(
        `http://localhost:8080/projetos/remover-favorito?idUsuario=${idUsuario}&idProjeto=${idProjeto}`, 
        {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },  
    });
    if (!response.ok) {
        const error: any = await response.json();
        if (isErrorResponse(error)) {
            throw error;
        } else {
            throw new Error("Erro ao remover favorito. Status code = " + response.status);
        }
    }
};

const useRemoverFavoritos = () => {
    return useMutation({
        mutationFn: removerFavoritos,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["projetosSociaisFavoritados"]
            });

            queryClient.invalidateQueries({
                queryKey: ["projetosSociaisFavoritados", variables.idUsuario]
            });
        }
    });
};

export default useRemoverFavoritos;