import { create } from "zustand";
import type { Usuario } from "../interface/Usuario";

interface UsuarioStore {
    usuarioLogado: number;
    usuarioRole: string;
    usuarioSelecionado: Usuario;

    setUsuarioLogado: (novoUsuarioLogado: number) => void;
    setUsuarioRole: (novaUsuarioRole: string) => void;
    setUsuarioSelecionado: (novoUsuarioSelecionado: Usuario) => void;
}

const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuarioLogado: 0,
    usuarioRole: "",
    usuarioSelecionado: {} as Usuario,

    setUsuarioLogado: (novoUsuarioLogado: number) => set({ usuarioLogado: novoUsuarioLogado }),
    setUsuarioRole: (novaUsuarioRole: string) => set({ usuarioRole: novaUsuarioRole }),
    setUsuarioSelecionado: (novoUsuarioSelecionado: Usuario) => set({ usuarioSelecionado: novoUsuarioSelecionado}),
}));

export default useUsuarioStore;