import { useQuery } from "@tanstack/react-query";
import isErrorResponse from "../util/isErrorResponse";


const useRecuperarProjetoSocialPorId = (id: number, removido: boolean) => {
    const recuperarProdutoPorId = async (id: number) => {
        const response = await fetch(`http://localhost:8080/projetos/${id}`);
        if(!response.ok) {
        const error: any = await response.json();
            if(isErrorResponse(error)) {
                throw error;
            }
            else {
                throw new Error("Erro ao alterar produto. Status code = " + response.status);
            }
        }

        return await response.json();
    }

    return useQuery({
        queryKey: ["projetoSocial", id],
        queryFn: () => recuperarProdutoPorId(id),
        staleTime: 10_000,
        enabled: !removido,
    });
};

export default useRecuperarProjetoSocialPorId;