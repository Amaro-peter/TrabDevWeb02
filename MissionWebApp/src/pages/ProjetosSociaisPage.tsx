import { NavLink } from "react-router-dom";


const ProjetosSociais = () => {
  return (
    <>
        <div
            className="container-fluid py-5 w-100"
            style={{ backgroundColor: 'antiquewhite', marginTop: '64px' }}
        >
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
                <section id="titulo" className="mb-5">
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

                <section id="iniciativa" className="mb-5">
                    <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                        <div className="card-header">
                            <h2 style={{ color: '#c54708' }} className="mb-0">
                                Sobre a Iniciativa Juntos +
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="fw-bold fs-5">
                                A iniciativa <strong>Juntos +</strong> é uma rede colaborativa que
                                conecta milhares de instituições filantrópicas, sociais e religiosas
                                em todo o país. Ao fazer parte da rede, cada organização ganha
                                visibilidade e apoio para seus projetos, integrando-se a um ecossistema
                                de transformação social.
                            </p>
                            <p className="fw-bold fs-5">
                                A Juntos + conta com uma equipe exclusiva dedicada a planejar e executar
                                campanhas nacionais de arrecadação de fundos, estratégias de marketing e
                                ações de engajamento. Essas iniciativas ajudam a ampliar o impacto e a
                                sustentabilidade das instituições participantes em diversas regiões do
                                Brasil.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="diligencia" className="mb-5">
                    <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                        <div className="card-header">
                            <h2 style={{ color: '#c54708' }} className="mb-0">
                                Diligência e Transparência
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="fw-bold fs-5">
                                Para participar, a organização deve passar por um processo de análise e diligência, 
                                garantindo o alinhamento com os critérios e a transparência das informações.
                            </p>
                            <p className="fw-bold fs-5">
                                Acreditamos que a transparência e a responsabilidade são os pilares que fortalecem a confiança e o desenvolvimento sustentável das instituições parceiras.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="teste" className="mb-5">
                    <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                        <div className="card-header">
                            <h2 style={{ color: '#c54708' }} className="mb-0">
                                Teste de botões
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="col-12 mt-2 d-grid gap-2">
                                <NavLink to={"/projetos/1"} className="btn btn-primary">
                                    Projetos
                                </NavLink>
                                <NavLink to={"/cadastrar-projeto-social"} className="btn btn-primary">
                                    Cadastrar
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default ProjetosSociais;