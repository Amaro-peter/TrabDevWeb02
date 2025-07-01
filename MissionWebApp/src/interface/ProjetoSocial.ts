import type { Categoria } from "./Categoria";

export interface ProjetoSocial {
  id?: number;
  imagem: string;
  categoria: Categoria;
  nome: string;
  slug: string;
  descricao: string;
  ativo: boolean;
  responsavel: string;
  contato: string;
  doacao: number;
  dataInicio: Date;
}