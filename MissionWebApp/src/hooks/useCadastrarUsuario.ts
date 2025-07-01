import { useMutation } from "@tanstack/react-query";
import type { Usuario } from "../interface/Usuario";
import isErrorResponse from "../util/isErrorResponse";

const cadastrarUsuario = async (usuario: Usuario) => {
    const response = await fetch("http://localhost:8080/autenticacao/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario)
    });
    if(!response.ok) {
        const error: any = await response.json();
        if(isErrorResponse(error)) {
            throw error;
        }
        else {
            throw new Error("Erro ao cadastrar usuario. Status code = " + response.status);
        }
    }
    return await response.json();
};

const useCadastrarUsuario = () => {
    return useMutation({
        mutationFn: (usuario: Usuario) => cadastrarUsuario(usuario),
    });
};

export default useCadastrarUsuario;