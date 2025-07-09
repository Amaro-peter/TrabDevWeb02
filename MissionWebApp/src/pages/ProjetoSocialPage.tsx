import { useState } from "react";
import useProjetoSocialStore from "../store/useProjetoSocialStore";
import { useNavigate, useParams } from "react-router-dom";
import useRecuperarProjetoSocialPorId from "../hooks/useRecuperarProjetoSocialPorId";
import dayjs from "dayjs";
import useUsuarioStore from "../store/useUsuarioStore";

const ProjetoSocialPage = () => {
    const [removido, setRemovido] = useState(false);
    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
    const mensagem = useProjetoSocialStore((s) => s.mensagem);
    const setMensagem = useProjetoSocialStore((s) => s.setMensagem);
    const setProjetoSocialSelecionado = useProjetoSocialStore((s) => s.setProjetoSocialSelecionado);

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: projeto,
        isPending: carregandoProjetos,
        error: errorProjetos
    } = useRecuperarProjetoSocialPorId(+id!, removido);

    const tratarRemocao = (id: Number) => {
        setMensagem("Produto removido com sucesso!");
        setRemovido(true);
    }

    if(carregandoProjetos) {
        return <div>Carregando...</div>;
    }

    if(errorProjetos) {
        throw errorProjetos;
    }

    return (
        <>
            <div
            className="container-fluid py-5 w-100"
            style={{ backgroundColor: "antiquewhite", marginTop: "64px", minHeight: "70vh" }}
            >
                <div className="container" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
                    <section id="cadastro-produtos" className="mb-5">
                        <div className="card shadow-sm" style={{ border: "2px solid black" }}>
                            <div className="card-body">
                                {mensagem && (
                                    <div className="alert alert-primary" role="alert">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="bi flex-shrink-0 me-2"
                                            viewBox="0 0 16 16"
                                            role="img"
                                            aria-label="Warning:"
                                            style={{ height: "25px" }}
                                        >
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg>
                                        {mensagem}
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-lg-3 col-md-4">
                                        <img
                                            src={`/${projeto.imagem}`}
                                            className="d-block d-md-none mb-3"
                                            style={{ width: "170px" }}
                                        />
                                        <img
                                            src={`/${projeto.imagem}`}
                                            className="d-none d-md-block"
                                            style={{ width: "210px" }}
                                        />
                                    </div>
                                    <div className="col-lg-9 col-md-8">
                                        <div className="row">
                                            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Categoria</div>
                                            <div className="col-xl-10 col-lg-9 col-8">{projeto.categoria.nome}</div>
                                            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Nome</div>
                                            <div className="col-xl-10 col-lg-9 col-8">
                                                {projeto.nome} ({projeto.descricao})
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Doacao</div>
                                            <div className="col-xl-10 col-lg-9 col-8">
                                                {projeto.doacao.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                    useGrouping: true,
                                                })}
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Inicio</div>
                                            <div className="col-xl-10 col-lg-9 col-8">
                                                {dayjs(projeto.dataInicio).format("DD/MM/YYYY")}
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Ativo</div>
                                            <div className="col-xl-10 col-lg-9 col-8">
                                                {projeto.ativo ? "Sim" : "Não"}
                                            </div>
                                        </div>
                                    </div>
                                    {usuarioLogado === 1 && (
                                        <>
                                            <div className="col-lg-3 col-md-4 col-12 mt-3">
                                                <button
                                                    onClick={() => {
                                                        setProjetoSocialSelecionado(projeto);
                                                        navigate("/cadastrar-projeto-social");
                                                    }}
                                                    disabled={removido}
                                                    className="btn btn-sm me-3 w-100"
                                                    type="button"
                                                    style={{
                                                        backgroundColor: "#FFC3A5",
                                                        border: "2px solid black",
                                                        color: "#444",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                        transition: "all 0.25s ease-in-out",
                                                        padding: "0.5em 1em",
                                                        borderRadius: "0.3em",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#ffc0a8";
                                                        e.currentTarget.style.transform = "scale(1.02)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#FFC3A5";
                                                        e.currentTarget.style.transform = "scale(1)";
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                            </div>
                                        
                                            <div className="col-lg-3 col-md-4 col-12 mt-3">
                                                <button
                                                    /*onClick={() => tratarRemocao(projeto.id!)}*/
                                                    disabled={removido}
                                                    className="btn btn-sm w-100"
                                                    type="button"
                                                    style={{
                                                        backgroundColor: "#FF8866",
                                                        border: "2px solid black",
                                                        color: "#444",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                        transition: "all 0.25s ease-in-out",
                                                        padding: "0.5em 1em",
                                                        borderRadius: "0.3em",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#ff6b47";
                                                        e.currentTarget.style.transform = "scale(1.02)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = "#FF8866";
                                                        e.currentTarget.style.transform = "scale(1)";
                                                    }}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ProjetoSocialPage;