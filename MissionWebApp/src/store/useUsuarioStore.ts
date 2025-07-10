import { create } from "zustand";
import type { Usuario } from "../interface/Usuario";
import type { ProjetoSocial } from "../interface/ProjetoSocial";

interface UsuarioStore {
    usuarioLogado: number;
    usuarioRole: string;
    usuarioSelecionado: Usuario;
    mensagem: string;
    favoritos: ProjetoSocial[];

    setUsuarioLogado: (novoUsuarioLogado: number) => void;
    setMensagem: (novaMensagem: string) => void;
    setUsuarioRole: (novaUsuarioRole: string) => void;
    setUsuarioSelecionado: (novoUsuarioSelecionado: Usuario) => void;
    setFavoritos: (favoritos: ProjetoSocial[]) => void;
    addFavorito: (favorito: ProjetoSocial) => void;
    removeFavorito: (idProjeto: number) => void;
    isFavorito: (idProjeto: number) => boolean;
    limparFavoritos: () => void;
    getMensagem: () => string;
}

const useUsuarioStore = create<UsuarioStore>((set, get) => ({
    usuarioLogado: 0,
    usuarioRole: "",
    usuarioSelecionado: {} as Usuario,
    mensagem: "",
    favoritos: [],

    setUsuarioLogado: (novoUsuarioLogado: number) => set({ usuarioLogado: novoUsuarioLogado }),
    setUsuarioRole: (novaUsuarioRole: string) => set({ usuarioRole: novaUsuarioRole }),
    setUsuarioSelecionado: (novoUsuarioSelecionado: Usuario) => set({ usuarioSelecionado: novoUsuarioSelecionado}),

    setMensagem: (novaMensagem: string) => set(() => ({mensagem: novaMensagem})),
    
    setFavoritos: (favoritos: ProjetoSocial[]) => set({ favoritos }),
    
    addFavorito: (favorito: ProjetoSocial) => set((state) => ({
        favoritos: [...state.favoritos, favorito]
    })),
    
    removeFavorito: (idProjeto: number) => set((state) => ({
        favoritos: state.favoritos.filter(projeto => projeto.id !== idProjeto)
    })),
    
    isFavorito: (idProjeto: number) => {
        const { favoritos } = get();
        return favoritos.some(projeto => projeto.id === idProjeto);
    },
    
    limparFavoritos: () => set({ favoritos: [] }),

    getMensagem: () => {
        const { mensagem } = get();
        return mensagem;
    },
}));

export default useUsuarioStore;