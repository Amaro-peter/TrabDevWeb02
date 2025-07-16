import { useRef, type FormEvent } from "react";
import useProjetoSocialStore from "../store/useProjetoSocialStore";


const Pesquisa = () => {
    const setNome = useProjetoSocialStore((s) => s.setNome);
    const setPagina = useProjetoSocialStore((s) => s.setPagina);

    const nomeRef = useRef<HTMLInputElement>(null);

    const tratarNome = (nome: string) => {
        setNome(nome);
        setPagina(0);
    };

    return (
        <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                tratarNome(nomeRef.current!.value);
            }}
            className="d-flex flex-row mb-3"
        >
            <input 
                ref={nomeRef}
                type="text"
                className="form-control form-control-sm me-3"
                placeholder="Pesquisar por nome do projeto"
                style={{ border: '2px solid black', borderRadius: '0.25rem' }}
            />

            <button type="submit" className="btn btn-card-custom btn-sm">
                Pesquisar
            </button>
        </form>
    );
};

export default Pesquisa;