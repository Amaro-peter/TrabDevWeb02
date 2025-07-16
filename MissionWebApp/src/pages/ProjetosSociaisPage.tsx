import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeProjetosSociais from "../components/TabelaDeProjetosSociais";


const ProjetosSociais = () => {
  return (
    <>
        <div
            className="container-fluid py-4 w-100"
            style={{ backgroundColor: 'antiquewhite', marginTop: '64px' }}
        >
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
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
                
            </div>
        </div>
    </>
  )
}

export default ProjetosSociais;