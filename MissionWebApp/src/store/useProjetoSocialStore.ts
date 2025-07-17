import { create } from "zustand";
import type { ProjetoSocial } from "../interface/ProjetoSocial";

interface ProjetoSocialStore {
    pagina: number;
    tamanho: number;
    nome: string;
    mensagem: string;
    idRemovido: number | null;
    projetoSocialSelecionado: ProjetoSocial | null;

    setPagina: (novaPagina: number) => void;
    setNome: (novoNome: string) => void;
    setMensagem: (novaMensagem: string) => void;
    setIdRemovido: (id: number | null) => void;
    setProjetoSocialSelecionado: (novoProjetoSocialSelecionado: ProjetoSocial | null) => void;
}

const useProjetoSocialStore = create<ProjetoSocialStore>((set) => ({
    pagina: 0,
    tamanho: 3,
    nome: "",
    mensagem: "",
    idRemovido: null,
    projetoSocialSelecionado: {} as ProjetoSocial,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),
    setMensagem: (novaMensagem: string) => set(() => ({mensagem: novaMensagem})),
    setIdRemovido: (id: number | null) => set(() => ({idRemovido: id})),
    setProjetoSocialSelecionado: (novoProjetoSocialSelecionado: ProjetoSocial | null) => 
        set(() => ({projetoSocialSelecionado: novoProjetoSocialSelecionado})),
}));

export default useProjetoSocialStore;