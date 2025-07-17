import { NavLink } from "react-router-dom";
import "./css/Style.css";

const GuiaDoDesenvolvedor = () => {
  return (
    <div
      className="container-fluid w-100"
      style={{ backgroundColor: "antiquewhite" }}
    >
      <div className="container" style={{ paddingTop: "80px" }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb bg-white px-3 py-2" style={{ border: "2px solid black" }}>
            <li className="breadcrumb-item">
              <NavLink to="/" style={{ color: "#c54708", textDecoration: "none" }}>
                Início
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#c54708" }}>
              Guia do Desenvolvedor
            </li>
          </ol>
        </nav>

        <section id="overview" className="mb-5" >
          <div className="card shadow-sm" style={{ border: "2px solid black" }}>
            <div className="card-body text-center py-5">
              <h2 style={{ color: "#c54708" }} className="mb-3">
                Guia do Desenvolvedor
              </h2>
              <p className="fw-bold fs-4">
                Este guia é destinado a desenvolvedores que desejam contribuir para o projeto ou entender melhor como ele funciona.
              </p>
            </div>
          </div>
        </section>

        <section id="contribuir" className="mb-5">
          <div className="card shadow-sm" style={{ border: "2px solid black" }}>
            <div className="card-header">
              <h2 style={{ color: "#c54708" }} className="mb-0">
                Contribuindo para o projeto
              </h2>
            </div>
            <div className="card-body">
              <p className="fw-bold fs-5">
                Se você deseja contribuir para o projeto, siga estas etapas:
              </p>
              <ol className="fw-bold fs-5">
                <li>
                  Faça um fork do repositório no {" "}
                  <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge bg-dark text-white"
                  style={{ textDecoration: "none" }}
                  >
                    GitHub
                  </a>
                  .
                </li>
                <li>Crie uma branch para sua feature ou correção de bug.</li>
                <li>Faça suas alterações e commit.</li>
                <li>Envie um pull request para o repositório original.</li>
              </ol>
            </div>
          </div>
        </section>

        <section id="estrutura" className="mb-5">
          <div className="card shadow-sm" style={{ border: "2px solid black" }}>
            <div className="card-header">
              <h2 style={{ color: "#c54708" }} className="mb-0">
                Estrutura do Projeto
              </h2>
            </div>
            <div className="card-body">
              <p className="fw-bold fs-5">
                A estrutura do projeto é organizada da seguinte forma:
              </p>
              <ul className="fw-bold fs-5">
                <li>
                  <code>src/</code>: Código-fonte do projeto.
                </li>
                <li>
                  <code>public/</code>: Arquivos estáticos e HTML principal.
                </li>
                <li>
                  <code>tests/</code>: Testes automatizados.
                </li>
                <li>
                  <code>docs/</code>: Documentação do projeto.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="tecnologia">
          <h2 style={{ color: "#c54708" }} className="mb-4">
            Stack Tecnológico
          </h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm" style={{ border: "2px solid black" }}>
                <div className="card-header">
                  <h3 style={{ color: "#c54708" }} className="mb-0">
                    Frontend
                  </h3>
                </div>
                <div className="card-body">
                  <p>
                    Desenvolvido em <strong>React</strong> com <strong>Chakra UI</strong> para componentes acessíveis e tema customizável.
                  </p>
                  <ul>
                    <li>
                      <code>src/components/</code>: Componentes reutilizáveis (Botões, Formulários, Cards).
                    </li>
                    <li>
                      <code>src/pages/</code>: Páginas do React Router (Home, Perfil, Ajuda).
                    </li>
                    <li>
                      <code>src/theme/</code>: Extensões de tema do Chakra (cores, fontes, espaçamentos).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm" style={{ border: "2px solid black" }}>
                <div className="card-header">
                  <h3 style={{ color: "#c54708" }} className="mb-0">
                    Backend
                  </h3>
                </div>
                <div className="card-body">
                  <p>
                    API server em <strong>Node.js</strong> com <strong>Express</strong>, integrado ao <strong>Firebase</strong> para autenticação e banco de dados em tempo real.
                  </p>
                  <ul>
                    <li>
                      <code>functions/</code>: Firebase Cloud Functions para lógica de backend.
                    </li>
                    <li>
                      <code>firebase.json</code>: Configurações do projeto Firebase.
                    </li>
                    <li>
                      <code>firestore.rules</code>: Regras de segurança do Firestore.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuiaDoDesenvolvedor;