import { NavLink } from "react-router-dom";
import "./css/Style.css";
import { useState } from "react";

const JuntosMais = () => {
    
    const [progress, setProgress] = useState(0);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProgress(0);
            let value = 0;
            const interval = setInterval(() => {
                value += 10;
                setProgress(value);
                if (value >= 100) clearInterval(interval);
            }, 150);
        }
    };

    return (
        <div
            className="container-fluid py-5 w-100"
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
                    <li className="breadcrumb-item active" aria-current="page" style={{ color: "#c54708" }}>
                        Juntos+
                    </li>
                    </ol>
                </nav>


                <section id="titulo" className="mb-5">
                    <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                        <div className="card-body text-center py-5">
                            <h1 style={{ color: '#c54708' }} className="mb-3">
                                Juntos +
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

                <section id="carta-apresentacao" className="mb-5">
                    <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                        <div className="card-header">
                            <h2 style={{ color: '#c54708' }} className="mb-0">
                                Se você é um projeto social, junte-se a nós
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="fw-bold fs-5">
                                Para participar, faça upload de uma carta de apresentação sobre a sua instituição (PDF):
                            </p>
                            <input
                                type="file"
                                className="form-control mb-3"
                                id="pdfUpload"
                                accept="application/pdf"
                                onChange={handleFile}
                            />
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${progress}%`,
                                        color: 'black',
                                        backgroundColor: '#e35712'
                                    }}
                                    aria-valuenow={progress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {progress}%
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default JuntosMais;