import type { ReactNode } from "react";
import useRecuperarProjetosSociaisComPaginacao from "../hooks/useRecuperarProjetosSociaisComPaginacao";
import useProjetoSocialStore from "../store/useProjetoSocialStore";


const Paginacao = () => {
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

    const tratarPaginacao = (pagina: number) => {
        setPagina(pagina);
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

    const totalDePaginas: number = resultadoPaginado.totalDePaginas;

    const arrayDePaginas: ReactNode[] = [];

    for(let i = 0; i < totalDePaginas; i++) {
        arrayDePaginas.push(
            <li className={pagina === i ? "page-item active" : "page-item"} key={i}>
                <a onClick={() => tratarPaginacao(i)} className="page-link" aria-current="page" style={{ cursor: 'pointer'}}>
                    {i + 1}
                </a>
            </li>
        );

    }

    if(totalDePaginas < 2) {
        return;
    }

    return (
        <nav aria-label="paginacao">
            <ul className="pagination">
                <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
                    <a onClick={() => tratarPaginacao(pagina - 1)} className="page-link" aria-current="page" style={{ cursor: 'pointer'}}>
                        Anterior
                    </a>
                </li>
                {arrayDePaginas}
                <li className={pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"}>
                    <a onClick={() => tratarPaginacao(pagina + 1)} className="page-link" aria-current="page" style={{ cursor: 'pointer'}}>
                        Próxima
                    </a>
                </li>
            </ul>
        </nav>
    );

};

export default Paginacao;