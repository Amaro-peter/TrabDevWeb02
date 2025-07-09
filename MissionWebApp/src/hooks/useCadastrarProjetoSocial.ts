import { useMutation } from "@tanstack/react-query";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import isErrorResponse from "../util/isErrorResponse";
import queryClient from "../main";


const cadastrarProjetoSocial = async (projetoSocial: ProjetoSocial): Promise<ProjetoSocial> => {
    const response = await fetch("http://localhost:8080/projetos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projetoSocial)
    });
    if(!response.ok) {
        const error: any = await response.json();
        if(isErrorResponse(error)) {
            throw error;
        } else {
            throw new Error("Erro desconhecido ao cadastrar projeto social: " + response.status);
        }
    }

    return await response.json();
};

const useCadastrarProjetoSocial = () => {
    return useMutation({
        mutationFn: (projetoSocial: ProjetoSocial) => cadastrarProjetoSocial(projetoSocial),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projetos"]
            });
        }
    });
};

export default useCadastrarProjetoSocial;

