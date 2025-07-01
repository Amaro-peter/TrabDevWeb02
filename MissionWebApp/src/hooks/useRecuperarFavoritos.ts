import { useQuery } from "@tanstack/react-query";
import isErrorResponse from "../util/isErrorResponse";
import type { ProjetoSocial } from "../interface/ProjetoSocial";



const useRecuperarFavoritos = (idConta: number) => {
  const recuperarFavoritos = async (idConta: number): Promise<ProjetoSocial[]> => {
    const response = await fetch("http://localhost:8080/projetos/favoritos/" 
        + idConta);
    if(!response.ok) {
        const error: any = await response.json();
        if(isErrorResponse(error)) {
            throw error;
        }
        else {
            throw new Error("Erro ao alterar produto. Status code = " + response.status);
        }
    }
    return response.json();
  }

  return useQuery({
    queryKey: ["projetosSociaisFavoritados", idConta],
    queryFn: ({ queryKey }) => {
      const [, idConta] = queryKey as [string, number];
      return recuperarFavoritos(idConta);
    },
    staleTime: 0,
  });
}

export default useRecuperarFavoritos;