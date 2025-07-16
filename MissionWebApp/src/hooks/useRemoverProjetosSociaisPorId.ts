import { useMutation } from "@tanstack/react-query";
import isErrorResponse from "../util/isErrorResponse";
import queryClient from "../main";


const removerProjetoSocialPorId = async (idProjeto: number) => {
    const response = await fetch("http://localhost:8080/projetos/" + idProjeto, {
        method: "DELETE"
    });

    if(!response.ok) {
        const error: any = await response.json();
        if(isErrorResponse(error)) {
            throw error;
        }
        else {
            throw new Error("Erro ao alterar produto. Status code = " + response.status);
        }
    }
};

const useRemoverProjetosSociaisPorId = () => {
    return useMutation<void, Error, number> ({
        mutationFn: (idProjeto: number) => removerProjetoSocialPorId(idProjeto),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["projetosSociais"]
            });
            queryClient.invalidateQueries({
                queryKey: ["projetoSocial", id]
            });
        },
    });
};

export default useRemoverProjetosSociaisPorId;