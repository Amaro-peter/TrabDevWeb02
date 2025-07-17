import { useMutation } from "@tanstack/react-query";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import isErrorResponse from "../util/isErrorResponse";
import queryClient from "../main";


const alterarProjetoSocial = async (projetoSocial: ProjetoSocial): Promise<ProjetoSocial> => {
    const response = await fetch("http://localhost:8080/projetos", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projetoSocial)
    });
    if(!response.ok) {
        const error: any = await response.json();
        if(isErrorResponse(error)) {
            throw error;
        } else {
            throw new Error("Erro desconhecido ao alterar projeto social: " + response.status);
        }
    }

    return await response.json();
};

const useAlterarProjetoSocial = () => {
    return useMutation({
        mutationFn: (projetoSocial: ProjetoSocial) => alterarProjetoSocial(projetoSocial),
        onSuccess: (projetoAlterado: ProjetoSocial) => {
            queryClient.invalidateQueries({
                queryKey: ["projetosSociais"]
            })
            queryClient.invalidateQueries({
                queryKey: ["projetoSocial", projetoAlterado.id]
            })
        }
    });
};

export default useAlterarProjetoSocial;