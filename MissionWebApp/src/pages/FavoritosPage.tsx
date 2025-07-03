import { useEffect, useState } from "react";
import useRecuperarFavoritos from "../hooks/useRecuperarFavoritos";
import useUsuarioStore from "../store/useUsuarioStore";
import type { ProjetoCarrinho } from "./CardsPorSlugCategoria";
import { useNavigate } from "react-router-dom";


const NaN = (value : number): boolean => {
    return Number.isNaN(value);
}


const FavoritosPage = () => {

    const[carrinho, setCarrinho] = useState<ProjetoCarrinho[]>(() => {
        const itensDeCarrinho = localStorage.getItem("carrinho");
        return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
    });


    const [inputQuantities, setInputQuantities] = useState<{ [id: number]: string }>({});

    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }, [carrinho]);

    useEffect(() => {
        const handleStorageChange = () => {
            const itensCarrinho = localStorage.getItem("carrinho");
            const novoCarrinho = itensCarrinho ? JSON.parse(itensCarrinho) : [];
            setCarrinho(novoCarrinho);
        }

        window.addEventListener('storage', handleStorageChange);

        window.addEventListener('carrinhoAtualizado', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('carrinhoAtualizado', handleStorageChange);
        };
    }, []);

    const navigate = useNavigate();

    const handleVoltarDoacoes = () => {
        navigate("/facaUmaDoacao");
    }

    const atualizarQuantidade = (idProjeto: number, novaQuantidade: number) => {
        if(novaQuantidade < 0) {
            return;
        }

        if(novaQuantidade === 0) {
            setCarrinho((atual: ProjetoCarrinho[]) =>
                atual.filter((item: ProjetoCarrinho) => item.idProjeto !== idProjeto)
            );

            setInputQuantities((prev) => {
                const { [idProjeto]: _, ...rest} = prev;
                return rest;
            });
            
        } else {
            setCarrinho((atual: ProjetoCarrinho[]) =>
                atual.map((item) =>
                    item.idProjeto === idProjeto ? { ...item, quantidade: novaQuantidade} : item
                )
            );
        }

        

        setTimeout(() => {
            window.dispatchEvent(new Event('carrinhoAtualizado'));
        }, 0);
    };

    const removerItem = (idProjeto: number) => {
        setCarrinho((atual: ProjetoCarrinho[]) => {
            const novoCarrinho = atual.filter((item: ProjetoCarrinho) => item.idProjeto !== idProjeto);

            window.dispatchEvent(new Event('carrinhoAtualizado'));

            return novoCarrinho;
        });

        setInputQuantities((prev) => {
            const { [idProjeto]: _, ...rest } = prev;
            return rest;
        });

        setTimeout(() => {
            window.dispatchEvent(new Event('carrinhoAtualizado'));
        }, 0);
    };

    const usuario = useUsuarioStore((s) => s.usuarioLogado);
    
    const { data: projetosSociais, 
        isPending: carregandoProjetos, 
        error: errorProjetos, 
    } = useRecuperarFavoritos(usuario);

    if(carregandoProjetos) {
        return (
            <div className="container text-center py-5">
                <h2>Carregando projetos sociais favoritos...</h2>
            </div>
        );
    }

    if(errorProjetos) {
        throw new Error("Erro ao carregar projetos sociais favoritos: " + errorProjetos.message);
    }

    return (
        <div
        className="container-fluid py-5"
        style={{
            backgroundColor: "antiquewhite",
            marginTop: "64px",
            minHeight: "100vh",
            borderBottom: "2px solid black",
        }}
        >
            <div className="container text-center" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
                <section id="titulo" className="mb-5">
                <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                    <div className="card-body text-center py-5">
                    <h1 style={{ color: '#c54708' }} className="mb-3">
                        Favoritos
                    </h1>
                    <p className="fw-bold fs-4">
                        Explore seus projetos sociais favoritos.
                    </p>
                    </div>
                </div>
                </section>

                <div className="table-responsive">
                    <table className="table table-responsive table-bordered table-sm table-hover table-striped align-middle">
                        <thead className="table-light">
                            <tr className="text-center">
                                <th className="text-center align-middle">Projeto Social</th>
                                <th className="text-center align-middle">Doação</th>
                                <th className="text-center align-middle">Quantidade</th>
                                <th className="text-center align-middle">Doação Total</th>
                                <th className="text-center align-middle">Remover</th>
                            </tr>
                        </thead>
                        {projetosSociais && projetosSociais.length > 0 && (
                            <tbody>
                                {projetosSociais.map((projeto) => {
                                    const itemCarrinho = carrinho.find(
                                        (item: ProjetoCarrinho) => item.idProjeto === projeto.id
                                    );

                                    const projetoAtual = itemCarrinho ? itemCarrinho : "";

                                    const currentStr = inputQuantities[projeto.id as number] !== undefined ? 
                                        inputQuantities[projeto.id as number]
                                        : String(itemCarrinho ? itemCarrinho.quantidade : 0);
                                    
                                    const valorParse = parseInt(currentStr);

                                    const quantidadeForCalc = currentStr === "" || NaN(valorParse) ? 1 : valorParse;

                                    const precoTotal = quantidadeForCalc * projeto.doacao;

                                    return (
                                        <tr key={projeto.id}>
                                            <td className="text-start">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img src={projeto.imagem} alt={projeto.nome} style={{ width: "300px" }} />
                                                    <div>
                                                        <strong>
                                                            {projeto.nome}
                                                        </strong> 
                                                        
                                                        <br />

                                                        <small>
                                                            {projeto.descricao}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="text-center">
                                                R${projeto.doacao.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                    useGrouping: true
                                                })}
                                            </td>

                                            <td className="text-center">
                                                <input 
                                                    type="number"
                                                    min={0}
                                                    className="form-control form-control-sm text-center"
                                                    value={currentStr}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setInputQuantities((prev) => ({
                                                            ...prev,
                                                            [projeto.id as number]: newValue,
                                                        }));
                                                        const parsed = parseInt(newValue);
                                                        if(newValue !== "" && !NaN(parsed)) {
                                                            if(projetoAtual !== "") {
                                                                atualizarQuantidade(projetoAtual.idProjeto, parsed);
                                                            } else if (parsed > 0) {
                                                                setCarrinho((prev: ProjetoCarrinho[]) => [
                                                                    ...prev,
                                                                    { idProjeto: projeto.id as number, quantidade: parsed }
                                                                ]);

                                                                setTimeout(() => {
                                                                    window.dispatchEvent(new Event('carrinhoAtualizado'));
                                                                }, 0);
                                                            }
                                                        }
                                                    }}

                                                    onBlur={(e) => {
                                                        const newValue = e.target.value;
                                                        const parsed = parseInt(newValue);
                                                        if((newValue === "" || NaN(parsed)) && projetoAtual !== "") {
                                                            e.target.focus();
                                                        }
                                                    }}
                                                    style={{ maxWidth: "80px", margin: "auto" }}

                                                />
                                            </td>

                                            <td className="text-center">
                                                R$  {precoTotal.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                    useGrouping: true
                                                })}
                                            </td>

                                            <td className="text-center">
                                                <button className="btn btn-danger btn-sm" /*onClick={() => tratarRemocao(projeto.id!)}*/>
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                                )}
                            </tbody>
                        )}

                        {projetosSociais && projetosSociais.length > 0 && (
                            <tfoot>
                                <tr>
                                    <td className="text-center align-middle" colSpan={3}>
                                    Total...
                                    </td>
                                    <td className="text-center align-middle">
                                        R$ {projetosSociais.reduce((total, projeto) => {
                                            const itemCarrinho = carrinho.find(
                                                (item: ProjetoCarrinho) => item.idProjeto === projeto.id
                                            );

                                            const currentStr = inputQuantities[projeto.id as number] !== undefined ? 
                                                inputQuantities[projeto.id as number]
                                                : String(itemCarrinho ? itemCarrinho.quantidade : 0);

                                            const valorParsed = parseInt(currentStr);

                                            const quantidadeCalc = currentStr === "" || NaN(valorParsed) ? 1 : valorParsed;

                                            return total + quantidadeCalc * projeto.doacao;

                                        }, 0).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            useGrouping: true
                                        })}
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>

                <div className="container mt-3">
                    <div className="d-flex flex-column flex-md-row justify-content-md-evenly align-items-center gap-2">
                        <button 
                        className="donor-button"
                        onClick={handleVoltarDoacoes}
                        >
                        Voltar para doações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritosPage;