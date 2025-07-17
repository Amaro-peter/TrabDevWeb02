import { useQuery, useMutation } from "@tanstack/react-query";
import isErrorResponse from "../util/isErrorResponse";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import queryClient from "../main";

export const useRecuperarProjetoSocialPorId = (id: number, removido: boolean) => {
    const recuperarProjetoPorId = async (id: number) => {
        const response = await fetch(`http://localhost:8080/projetos/${id}`);
        if (!response.ok) {
            const error: any = await response.json();
            if (isErrorResponse(error)) {
                throw error;
            } else {
                throw new Error("Erro ao recuperar projeto. Status code = " + response.status);
            }
        }
        return await response.json();
    };

    return useQuery({
        queryKey: ["projetoSocial", id],
        queryFn: () => recuperarProjetoPorId(id),
        staleTime: 10_000,
        enabled: !removido,
    });
};

export const useCadastrarProjetoSocial = () => {
    const cadastrarProjeto = async (projeto: ProjetoSocial): Promise<ProjetoSocial> => {
        const response = await fetch("http://localhost:8080/projetos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            const error: any = await response.json();
            if (isErrorResponse(error)) throw error;
            throw new Error("Erro ao cadastrar projeto. Status code = " + response.status);
        }
        return await response.json();
    };

    return useMutation({
        mutationFn: cadastrarProjeto,
        onSuccess: (projetoCadastrado: ProjetoSocial) => {
            queryClient.invalidateQueries({ queryKey: ["projetosSociais"] });
            queryClient.invalidateQueries({ queryKey: ["projetoSocial", projetoCadastrado.id] });
        },
    });
};

export const useAlterarProjetoSocial = () => {
    const alterarProjeto = async (projeto: ProjetoSocial): Promise<ProjetoSocial> => {
        const response = await fetch("http://localhost:8080/projetos", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projeto),
        });
        if (!response.ok) {
            const error: any = await response.json();
            if (isErrorResponse(error)) throw error;
            throw new Error("Erro ao alterar projeto. Status code = " + response.status);
        }
        return await response.json();
    };

    return useMutation({
        mutationFn: alterarProjeto,
        onSuccess: (projetoAlterado: ProjetoSocial) => {
            queryClient.invalidateQueries({ queryKey: ["projetosSociais"] });
            queryClient.invalidateQueries({ queryKey: ["projetoSocial", projetoAlterado.id] });
        },
    });
};

export const useRemoverProjetosSociaisPorId = () => {
    const removerProjeto = async (id: number) => {
        const response = await fetch(`http://localhost:8080/projetos/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const error: any = await response.json();
            if (isErrorResponse(error)) throw error;
            throw new Error("Erro ao remover projeto. Status code = " + response.status);
        }
    };

    return useMutation<void, Error, number>({
        mutationFn: removerProjeto,
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["projetosSociais"] });
            queryClient.invalidateQueries({ queryKey: ["projetoSocial", id] });
        },
    });
};

const useAPI = {
    useRecuperarProjetoSocialPorId,
    useCadastrarProjetoSocial,
    useAlterarProjetoSocial,
    useRemoverProjetosSociaisPorId,
};

export default useAPI;
