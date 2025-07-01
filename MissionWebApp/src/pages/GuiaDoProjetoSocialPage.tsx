import "./css/Style.css";

const GuiaDoProjetoSocial = () => {
  return (
    <>
      <div
        className="container-fluid py-5 w-100"
        style={{ backgroundColor: "antiquewhite" }}
      >
        <div className="container" style={{ paddingTop: "80px", paddingBottom: "20px" }}>
          <section id="titulo" className="mb-5">
            <div className="card shadow-sm border border-2 border-dark">
              <div className="card-body text-center py-5">
                <h3 className="mb-3" style={{ color: "#c54708" }}>
                  Guia do Projeto Social
                </h3>
                <p className="fw-bold fs-4">
                  Descubra como o Mission App pode transformar o impacto de
                  organizações sem fins lucrativos por meio da tecnologia.
                </p>
              </div>
            </div>
          </section>

          <section id="sobre" className="mb-5">
            <div className="card shadow-sm border border-2 border-dark">
              <div className="card-header">
                <h3 className="mb-0" style={{ color: "#c54708" }}>
                  O que é o Mission App?
                </h3>
              </div>
              <div className="card-body">
                <p className="fw-bold fs-5">
                  O Mission App pode impulsionar o impacto de ONGs e iniciativas
                  sociais ao oferecer uma plataforma digital que facilita o
                  engajamento com causas sociais. Através da conexão entre
                  usuários e projetos locais, o app incentiva a participação ativa
                  em ações comunitárias e torna mais simples o acompanhamento e
                  fidelização de voluntários e doadores.
                </p>
              </div>
            </div>
          </section>

          <section id="impacto" className="mb-5">
            <div className="card shadow-sm border border-2 border-dark">
              <div className="card-header">
                <h3 className="mb-0" style={{ color: "#c54708" }}>
                  Impacto para ONGs e Organizações Sociais
                </h3>
              </div>
              <div className="card-body">
                <p className="fw-bold fs-5">
                  O Mission App pode potencializar o alcance de ONGs ao fornecer
                  uma plataforma digital para registrar decisões por Cristo,
                  conectar usuários a igrejas locais e automatizar o envio de
                  mensagens e acompanhamento pastoral. Isso amplia a capacidade
                  de atuação com poucos recursos e fortalece a rede de apoio
                  espiritual.
                </p>
              </div>
            </div>
          </section>

          <section id="setup" className="mb-5">
            <div className="card shadow-sm border border-2 border-dark">
              <div className="card-header">
                <h3 className="mb-0" style={{ color: "#c54708" }}>
                  Como configurar o Mission App
                </h3>
              </div>
              <div className="card-body">
                <p className="fw-bold fs-5">
                  Para configurar a aplicação web, é necessário:
                </p>
                <ul className="fw-bold fs-5">
                  <li>Clonar o repositório GitHub</li>
                  <li>
                    Instalar as dependências com <code>npm install</code>
                  </li>
                  <li>Configurar variáveis de ambiente (.env)</li>
                  <li>
                    Executar o frontend e backend localmente com{" "}
                    <code>npm start</code> ou <code>firebase emulators:start</code>
                  </li>
                </ul>
                <p className="fw-bold fs-5">
                  Caso a sua organização não tenha alguém de TI para colocar o
                  aplicativo no ar, contamos com um grupo de voluntários que podem
                  ajudar -{" "}
                  <a href="" className="alert-link" style={{ color: "#c54708" }}>
                    preencha o formulário para entrar em contato
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          <section id="custos" className="mb-5">
            <div className="card shadow-sm border border-2 border-dark">
              <div className="card-header">
                <h3 className="mb-0" style={{ color: "#c54708" }}>
                  Custos para Manter um Web App
                </h3>
              </div>
              <div className="card-body">
                <p className="fw-bold fs-5">
                  Manter um aplicativo web envolve custos como:
                </p>
                <ul className="fw-bold fs-5">
                  <li>Hospedagem (ex: Firebase, Vercel, AWS)</li>
                  <li>Domínio personalizado</li>
                  <li>Serviços de e-mail e autenticação</li>
                  <li>
                    Manutenção técnica e atualizações de segurança
                  </li>
                </ul>
                <p className="fw-bold fs-5">
                  Caso não queira ter nenhum custo adicional, participe da Juntos+,
                  a mesma plataforma do Mission App compartilhada por milhares de
                  instituições.{" "}
                  <a href="juntosmais.html" className="alert-link" style={{ color: "#c54708" }}>
                    Saiba mais aqui!
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GuiaDoProjetoSocial;