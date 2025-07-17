import { NavLink, useNavigate } from "react-router-dom";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeProjetosSociais from "../components/TabelaDeProjetosSociais";
import useUsuarioStore from "../store/useUsuarioStore";


const ProjetosSociais = () => {
    const usuarioLogado = useUsuarioStore((state) => state.usuarioLogado);
    const navigate = useNavigate();

    return (
        <>
            <div
                className="container-fluid py-4 w-100"
                style={{ backgroundColor: 'antiquewhite', marginTop: '64px' }}
            >
                <div className="container" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb bg-white px-3 py-2" style={{ border: "2px solid black" }}>
                        <li className="breadcrumb-item">
                            <NavLink to="/" style={{ color: "#c54708", textDecoration: "none" }}>
                                Início
                            </NavLink>
                        </li>

                        <li className="breadcrumb-item">
                            <NavLink to="/juntosMais" style={{ color: "#c54708", textDecoration: "none" }}>
                                Juntos+
                            </NavLink>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page" style={{ color: "#c54708" }}>
                            Projetos Sociais
                        </li>
                        </ol>
                    </nav>

                    <section id="titulo" className="mb-3">
                        <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                            <div className="card-body text-center py-5">
                                <h1 style={{ color: '#c54708' }} className="mb-3">
                                    Projetos Sociais
                                </h1>
                                <p className="fw-bold fs-4">
                                    Unindo forças para transformar realidades.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="teste" className="mb-5">
                        <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                            <div className="card-header">
                                <h2 style={{ color: '#c54708' }} className="mb-0">
                                    Conheça nossos Projetos
                                </h2>
                            </div>
                            <div className="card-body">
                                <Pesquisa />
                                <TabelaDeProjetosSociais />
                                <Paginacao />
                            </div>
                        </div>
                    </section>

                    {usuarioLogado === 1 && (
                        <section id="cadastrar-projeto-social" className="mb-5">
                            <div className="card shadow-sm" style={{ border: "2px solid black" }}>
                                <div className="card-header text-center">
                                    <h2 style={{ color: "#c54708" }} className="mb-0">
                                        Cadastrar Novo Projeto
                                    </h2>
                                </div>
                                <div className="card-body d-flex justify-content-center">
                                    <button
                                        onClick={() => {
                                            
                                            navigate("/cadastrar-projeto-social");
                                        }}
                                        className="btn btn-sm"
                                        type="button"
                                        style={{
                                            width: "60%",
                                            backgroundColor: "#FFC3A5",
                                            border: "2px solid black",
                                            color: "#444",
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            transition: "all 0.25s ease-in-out",
                                            padding: "0.5em 1em",
                                            borderRadius: "0.3em",
                                            minHeight: "44px",
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
                                        Cadastrar
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjetosSociais;