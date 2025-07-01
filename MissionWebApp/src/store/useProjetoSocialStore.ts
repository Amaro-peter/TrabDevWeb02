import { create } from "zustand";
import type { ProjetoSocial } from "../interface/ProjetoSocial";

interface ProjetoSocialStore {
    pagina: number;
    tamanho: number;
    nome: string;
    mensagem: string;
    projetoSocialSelecionado: ProjetoSocial;

    setPagina: (novaPagina: number) => void;
    setNome: (novoNome: string) => void;
    setMensagem: (novaMensagem: string) => void;
    setProjetoSocialSelecionado: (novoProjetoSocialSelecionado: ProjetoSocial) => void;
}

const useProjetoSocialStore = create<ProjetoSocialStore>((set) => ({
    pagina: 0,
    tamanho: 3,
    nome: "",
    mensagem: "",
    projetoSocialSelecionado: {} as ProjetoSocial,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),
    setMensagem: (novaMensagem: string) => set(() => ({mensagem: novaMensagem})),
    setProjetoSocialSelecionado: (novoProjetoSocialSelecionado: ProjetoSocial) => 
        set(() => ({projetoSocialSelecionado: novoProjetoSocialSelecionado})),
}));

export default useProjetoSocialStore;