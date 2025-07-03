import { create } from "zustand";
import type { Usuario } from "../interface/Usuario";
import type { ProjetoSocial } from "../interface/ProjetoSocial";

interface UsuarioStore {
    usuarioLogado: number;
    usuarioRole: string;
    usuarioSelecionado: Usuario;
    favoritos: ProjetoSocial[];

    setUsuarioLogado: (novoUsuarioLogado: number) => void;
    setUsuarioRole: (novaUsuarioRole: string) => void;
    setUsuarioSelecionado: (novoUsuarioSelecionado: Usuario) => void;
    setFavoritos: (favoritos: ProjetoSocial[]) => void;
    addFavorito: (favorito: ProjetoSocial) => void;
    removeFavorito: (idProjeto: number) => void;
    isFavorito: (idProjeto: number) => boolean;
    limparFavoritos: () => void;
}

const useUsuarioStore = create<UsuarioStore>((set, get) => ({
    usuarioLogado: 0,
    usuarioRole: "",
    usuarioSelecionado: {} as Usuario,
    favoritos: [],

    setUsuarioLogado: (novoUsuarioLogado: number) => set({ usuarioLogado: novoUsuarioLogado }),
    setUsuarioRole: (novaUsuarioRole: string) => set({ usuarioRole: novaUsuarioRole }),
    setUsuarioSelecionado: (novoUsuarioSelecionado: Usuario) => set({ usuarioSelecionado: novoUsuarioSelecionado}),
    
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
}));

export default useUsuarioStore;