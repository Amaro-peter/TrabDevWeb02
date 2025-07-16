import { Link } from "react-router-dom";
import useRecuperarProjetosSociaisComPaginacao from "../hooks/useRecuperarProjetosSociaisComPaginacao";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import useProjetoSocialStore from "../store/useProjetoSocialStore";
import dayjs from "dayjs";
import type { ProjetoCarrinho } from "../pages/CardsPorSlugCategoria";
import useRemoverProjetosSociaisPorId from "../hooks/useRemoverProjetosSociaisPorId";
import useUsuarioStore from "../store/useUsuarioStore";


const TabelaDeProjetosSociais = () => {
    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);

    const pagina = useProjetoSocialStore((s) => s.pagina);
    const tamanho = useProjetoSocialStore((s) => s.tamanho);
    const nome = useProjetoSocialStore((s) => s.nome);

    const setPagina = useProjetoSocialStore((s) => s.setPagina);

    const {
        data: resultadoPaginado,
        isPending: carregandoProjetos,
        error: errorProjetos,
    } = useRecuperarProjetosSociaisComPaginacao({
        pagina: pagina.toString(),
        tamanho: tamanho.toString(),
        nome: nome,
    });

    const { mutate: removerProjetoSocialPorId, error: errorRemocao } = useRemoverProjetosSociaisPorId();

    const tratarRemocaoNaTabela = (id: number) => {

        removerProjetoSocialPorId(id);

        const itensDeCarrinho = localStorage.getItem("carrinho");
        const carrinho = itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];

        const novoCarrinho = carrinho.filter((item: ProjetoCarrinho) => item.idProjeto !== id);

        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

        window.dispatchEvent(new Event("carrinhoAtualizado"));

        setPagina(0);

    };

    if(carregandoProjetos) {
        return (
            <p className="fw-bold fs-5 text-center" style={{ color: '#c54708' }}>
                Carregando projetos sociais...
            </p>
        );
    }

    if(errorProjetos) {
        throw errorProjetos;
    }

    if(errorRemocao) {
        throw errorRemocao;
    }

    const projetos: ProjetoSocial[] = resultadoPaginado.itens;

    return (
        <>
            <div className="table-responsive">
                <table className="table table-responsive table-bordered table-sm table-hover table-striped align-middle">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th className="text-center align-middle">Id</th>
                            <th className="text-center align-middle">Imagem</th>
                            <th className="text-center align-middle">Categoria</th>
                            <th className="text-center align-middle">Nome</th>
                            <th className="text-center align-middle">Descrição</th>
                            <th className="text-center align-middle">Responsável</th>
                            <th className="text-center align-middle">Contato</th>
                            <th className="text-center align-middle">Data de Início</th>
                            <th className="text-center align-middle">Doacao</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projetos.map((projeto) => (
                            <tr key={projeto.id}>
                                <td width="8%" className="text-center align-middle">
                                    <Link style={{ textDecoration: "none" }} to={"/projetos/" + projeto.id}>
                                        {projeto.id}
                                    </Link>
                                </td>

                                <td width="13%" className="text-center align-middle">
                                    <Link style={{ textDecoration: "none" }} to={"/projetos/" + projeto.id}>
                                        <img src={projeto.imagem} alt="imagem do projeto" style={{width: "40px"}} />
                                    </Link>
                                </td>

                                <td width="13%" className="text-center align-middle">
                                    <Link style={{ textDecoration: "none" }} to={"/projetos/" + projeto.id}>
                                        {projeto.categoria.nome}
                                    </Link>
                                </td>

                                <td width="17%" className="align-middle ps-3">
                                    <Link style={{ textDecoration: "none" }} to={"/projetos/" + projeto.id}>
                                        {projeto.nome}
                                    </Link>
                                </td>

                                <td width="13%" className="text-center align-middle">
                                    {projeto.descricao}
                                </td>

                                <td width="13%" className="text-center align-middle">
                                    <Link style={{ textDecoration: "none" }} to={"/projetos/" + projeto.id}>
                                        {projeto.contato}
                                    </Link>
                                </td>

                                <td width="13%" className="text-center align-middle">
                                    <Link style={{ textDecoration: "none" }} to={"/projetos/" + projeto.id}>
                                        {projeto.responsavel}
                                    </Link>
                                </td>

                                <td width="13%" className="text-center align-middle">
                                    {dayjs(projeto.dataInicio).format("DD/MM/YYYY")}
                                </td>

                                <td width={"10%"} className="text-end align-middle pe-3">
                                    R$ {projeto.doacao.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                        useGrouping: true,
                                    })}
                                </td>

                                {usuarioLogado === 1 && (
                                    <>
                                        <td width="13%" className="text-center align-middle">
                                            <button onClick={() => tratarRemocaoNaTabela(projeto.id!)} className="btn btn-danger btn-sm" type="button">
                                                Remover
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default TabelaDeProjetosSociais;