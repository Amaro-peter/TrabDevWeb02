import "./css/Style.css";

const HomePage = () => {
  return (
    <>
    <div className="container-fluid d-none d-md-block mb-0" id="acesso" style={{ padding: 0, margin: 0 }}>
          <div className="ellipse-container">
            <div className="ellipse">    
            </div>
            <img src="image 4.svg" alt="Mission App Logo" className="big-logo" />
            <div className="content-area">
                <h1>Juntos+</h1>
                <div className="row" id="buttons">
                  <button type="button" className="donor-button">
                      <i className="fas fa-gift"></i> Doador
                  </button>
                  <button type="button" className="ngo-button">
                      <i className="fas fa-university"></i> Projeto social
                  </button>
                </div>
            </div>
          </div>
      </div>

      <div className="container-fluid px-0 d-block d-md-none mb-0" id="acesso-mobile" style={{ padding: 0, margin: 0 }}>
          <div className="card text-center w-100" id="acesso-mobile-card">
            <div className="bg-effect"></div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{gap: "5px"}}>
                <h4 className="card-title mb-0" style={{color: "black", fontWeight: "bold"}}>
                  Código aberto para projetos sociais.
                </h4>
                <h5 className="card-title mb-0" style={{color: "black", fontWeight: "bold"}}>
                  Juntos+
                </h5>
                <div className="d-flex flex-column align-items-center">
                  <button type="button" className="donor-button">
                      <i className="fas fa-gift"></i> Doador
                  </button>
                  <button type="button" className="ngo-button">
                      <i className="fas fa-university"></i> Projeto social
                  </button>
                </div>
            </div>
          </div> 
      </div>

      <div className="card mb-0" style={{ backgroundColor: "antiquewhite" }}>
        <div className="card-body align-items-center">
          <div className="text-center">
            <h2 className="card-title" style={{ color: "#c54708", justifyContent: "center" }}>
              Nossa Missão
            </h2>
          </div>
          <p className="card-text text-center" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            O Mission App é uma plataforma de código aberto feita para apoiar organizações na divulgação de projetos sociais e na conexão com o público.
          </p>
        </div>

        <img src="cover.svg" alt="Todos os povos" className="img-fluid mx-auto d-block mb-3" />

        <div className="card-body align-items-center">
          <div className="text-center">
            <h2 className="card-title" style={{ color: "#c54708", justifyContent: "center" }}>
              O que é o aplicativo?
            </h2>
          </div>
          <p className="card-text text-center" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            A plataforma permite a conexão de pessoas com projetos sociais. Organizações podem divulgar suas iniciativas com fotos inspiradoras, engajar o público,
            receber doações e organizar eventos de caridade com facilidade.
          </p>
        </div>

        <div id="carousel-id" className="carousel slide mb-3" data-bs-ride="carousel" data-bs-interval="1000" style={{ paddingBottom: "50px" }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carousel-id" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carousel-id" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex justify-content-center">
                <img src="Captura de ecrã 2025-04-22 120452 1.png" alt="Login do Mission App"
                  className="img-fluid clickable-image" style={{ maxHeight: "600px", objectFit: "cover" }} />
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex justify-content-center">
                <img src="Captura de ecrã 2025-04-22 141715 1.png" alt="Slide image"
                  className="img-fluid clickable-image" style={{ maxHeight: "600px", objectFit: "cover" }} />
              </div>
            </div>
          </div>

          <button className="carousel-control-prev d-none d-lg-block" type="button" data-bs-target="#carousel-id" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>

          <button className="carousel-control-next d-none d-lg-block" type="button" data-bs-target="#carousel-id" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>

        <div className="modal fade" id="imageModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <button type="button" className="btn-close position-absolute" style={{ right: "15px", top: "15px" }} data-bs-dismiss="modal" aria-label="Fechar"></button>
              <img src="" id="modalImage" className="img-fluid mx-auto d-block" />
            </div>
          </div>
        </div>

        <div className="card-body align-items-center justify-content-center mb-1">
          <div className="text-center">
            <h2 className="card-title" style={{ color: "#c54708"}}>
              Perguntas frequentes
            </h2>
          </div>
        </div>

        <div className="accordion mb-5" id="id-accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="id-header-gratuidade">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#id-gratuidade" aria-expanded="true" aria-controls="id-gratuidade">
                O aplicativo é gratuito?
              </button>
            </h2>
            <div id="id-gratuidade" className="accordion-collapse collapse show" data-bs-parent="#id-accordion">
              <div className="accordion-body">
                <p>
                  Sim, o código-fonte do aplicativo é totalmente gratuito para organizações e doadores.
                  Acreditamos que a solidariedade não deve ter custo.
                </p>

                <div className="alert alert-info alert-dismissible fade show">
                  <h4 className="alert-heading">
                    Atenção!
                  </h4>
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
                  <p>
                    O código-fonte deste projeto é gratuito.
                    No entanto, manter o site no ar envolve custos com servidores, armazenamento e outros.
                  </p>
                  <a href="#" className="alert-link">Saiba mais sobre custos na nossa página Guia do Projeto Social.</a>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="id-header-instalar">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#id-instalar" aria-expanded="false" aria-controls="id-instalar">
                Como usar o aplicativo web?
              </button>
            </h2>
            <div id="id-instalar" className="accordion-collapse collapse" data-bs-parent="#id-accordion">
              <div className="accordion-body">
                <p>
                  Para que o app funcione online, é necessário hospedá-lo em um servidor.
                  Esse processo envolve configurar o ambiente, publicar o código e manter o site no ar.
                </p>

                <p>
                  Disponibilizamos um <a href="#" className="alert-link" style={{ color: "#c54708" }}>Guia do Desenvolvedor</a> com o passo a passo.
                  Sua organização pode contar com voluntários para ajudar — <a href="" className="alert-link" style={{ color: "#c54708" }}>basta preencher este formulário</a>.
                </p>

                <p>
                  Ou, se preferir, participe da Juntos+. <a href="" className="alert-link" style={{ color: "#c54708" }}>Saiba mais aqui</a>.
                </p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="id-header-iniciativa">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#id-iniciativa" aria-expanded="false" aria-controls="id-iniciativa">
                O que é o Juntos+?
              </button>
            </h2>
            <div id="id-iniciativa" className="accordion-collapse collapse" data-bs-parent="#id-accordion">
              <div className="accordion-body">
                <p>
                  O Juntos+ é a plataforma Mission App compartilhada por milhares de instituições comprometidas com o bem comum.
                </p>

                <p>
                  A iniciativa conta com uma equipe dedicada de profissionais, responsável por organizar e divulgar campanhas de caridade ao longo do ano,
                  abordando diferentes causas e necessidades sociais — como ações solidárias no Natal, apoio a desabrigados, combate à fome, entre outras.
                </p>

                <p>
                  Ao participar, sua organização se conecta a uma rede confiável. Não há custos para se juntar ao Juntos+.
                  <a href="" className="alert-link" style={{ color: "#c54708" }}>Saiba mais aqui</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;