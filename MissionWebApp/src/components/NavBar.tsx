import { NavLink } from "react-router-dom";
import "./css/Style.css";
import useUsuarioStore from "../store/useUsuarioStore";

const NavBar = () => {
  const usuarioLogaodo = useUsuarioStore((s) => s.usuarioLogado);

  return (
    <>
      <nav className="navbar navbar-light bg-light navbar-expand-xl fixed-top" id="nav-bar">
        <div className="container">
          <NavLink className="navbar-brand" to={"/"}>
            <img src={`/image 4.svg`} alt="Mission App Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
            aria-controls="menu"
            aria-expanded="false"
            aria-label="Botão de navegação"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menu">
            <div className="d-flex justify-content-between w-100">
              <div className="navbar-nav" id="nav-info">
                <NavLink className="nav-item nav-link" to={"/"}>
                  Quem somos
                </NavLink>
                <div className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" id="documentacaoDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Documentação
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="documentacaoDropdown">
                    <li>
                      <NavLink className="dropdown-item" to={"/guiaDoDesenvolvedor"}>
                        Guia do desenvolvedor
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/guiaDoProjetoSocial"}>
                        Guia do projeto social
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" id="juntosMaisDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Juntos +
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="juntosMaisDropdown">
                    <li>
                      <NavLink className="dropdown-item" to={"/juntosMais"}>
                        O que é?
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Doador
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/projetos"}>
                        Projeto social
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <NavLink className="nav-item nav-link" to={"/facaUmaDoacao"}>
                  Faça uma doação
                </NavLink>
                <NavLink className="nav-item nav-link" to="#contatomodal" data-bs-toggle="modal">
                  Contato
                </NavLink>
              </div>

              <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to={"/entrar"}>
                  {usuarioLogaodo ? "Sair" : "Entrar"}
                </NavLink>
                <NavLink className="nav-item nav-link" to={"/favoritos"}>
                  Favoritos
                </NavLink>
                <NavLink className="nav-item nav-link" to={"/carrinho"}>
                  Carrinho
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="contatomodal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">Informações de contato</span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="mb-3">
                  <legend className="fw-bold">Insira seus dados</legend>

                  <div className="row mb-3">
                    <label htmlFor="nome" className="col-form-label col-lg-2">
                      Nome
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        id="nome"
                        name="nome"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="email" className="col-form-label col-lg-2">
                      Email
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        id="email"
                        name="email"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="org" className="col-form-label col-lg-2">
                      Organização
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Organização"
                        id="org"
                        name="org"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="phone" className="col-form-label col-lg-2">
                      Telefone
                    </label>
                    <div className="col-lg-10">
                      <div className="input-group">
                        <span className="input-group-text" id="phone-addon">
                          +55
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Seu número"
                          aria-describedby="phone-addon"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Inclua seu código de área sem espaços ou traços."
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default NavBar;
