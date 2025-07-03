import type { ProjetoSocial } from "../interface/ProjetoSocial";
import type { ProjetoCarrinho } from "../pages/CardsPorSlugCategoria";
import useUsuarioStore from "../store/useUsuarioStore";
import heart from "../assets/heart.svg";
import heartFilled from "../assets/heart-fill.svg";
import { useState } from "react";

interface Props {
    projeto: ProjetoSocial;
    projetosNoCarrinho: ProjetoCarrinho | null;
    adicionarProjetoSocial: (projeto: ProjetoSocial) => void;
    subtrairProjetoSocial: (projeto: ProjetoSocial) => void;
    favoritarProjetoSocial: (projeto: ProjetoSocial, id: Number) => void;
}

const Card = ({ projeto, adicionarProjetoSocial, subtrairProjetoSocial, projetosNoCarrinho, favoritarProjetoSocial }: Props) => {
    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
    const isFavorito = useUsuarioStore((s) => s.isFavorito);

    const[isClicked, setIsClicked] = useState(false);

    const handleFavoritar = () => {
        setIsClicked(!isClicked);
        if(!isClicked) {
            favoritarProjetoSocial(projeto, usuarioLogado);
        }
    }

    return (
        <div className="card h-100 border-0">
            <div className="card h-100" style={{ border: "2px solid black" }}>
                {usuarioLogado !== 0 && (
                    <div className="card-header">
                        <div className="d-flex justify-content-end align-items-center">
                            <button
                                onClick={() => handleFavoritar()}
                                style={{
                                    background: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <img 
                                    src={isFavorito(projeto.id!) ? heartFilled : heart}
                                    alt="Favoritar"
                                    style={{ width: "20px", height: "24px" }}
                                />
                            </button>
                        </div>
                    </div>
                )}
                <img src={`/${projeto.imagem}`}  className="card-img-top" alt={projeto.nome}/>
                <div className="card-body">
                    <h5 className="card-title">
                        {projeto.nome}
                    </h5>
                    <p className="card-text">
                        {projeto.descricao}
                    </p>
                    <p className="card-text fw-bold" style={{ color: "rgb(220, 60, 60)" }}>
                        R${" "}
                        {projeto.doacao.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        })}
                    </p>
                </div>
                <div className="card-footer p-0 mb-4 justify-content-center d-flex gap-2 border-0 bg-white">
                    <div style={projetosNoCarrinho ? { display: "block" } : { display: "none"}}>
                        <div className="btn-group w-100">
                            <button onClick={() => subtrairProjetoSocial(projeto)} type="button" className="btn btn-secondary btn-sm">
                                -
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm">
                                {projetosNoCarrinho?.quantidade}
                            </button>
                            <button onClick={() => adicionarProjetoSocial(projeto)} type="button" className="btn btn-secondary btn-sm">
                                +
                            </button>
                        </div>
                    </div>
                    <button style={projetosNoCarrinho ? { display: "none" } : { display: "block"}} 
                        onClick={() => adicionarProjetoSocial(projeto)}
                        type="button"
                        className="btn btn-card-custom btn-sm w-75"
                    >
                        Doar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;