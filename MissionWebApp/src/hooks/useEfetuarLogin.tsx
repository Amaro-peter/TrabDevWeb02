import { useMutation } from "@tanstack/react-query";
import type { Usuario } from "../interface/Usuario";
import isErrorResponse from "../util/isErrorResponse";


const efetuarLogin = async (usuario: Usuario) => {
    const response = await fetch("http://localhost:8080/autenticacao/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
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
    return await response.json();
};

const useEfetuarLogin = () => {
    return useMutation({
        mutationFn: (usuario: Usuario) => efetuarLogin(usuario),
    });
};

export default useEfetuarLogin;