import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUsuarioStore from "../store/useUsuarioStore";
import type { Usuario } from "../interface/Usuario";
import type { TokenResponse } from "../interface/TokenResponse";
import useEfetuarLogin from "../hooks/useEfetuarLogin";

interface FormLogin {
  role: string;
  conta: string;
  senha: string;
}

const LoginForm = () => {
    const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
    const setUsuarioRole = useUsuarioStore((s) => s.setUsuarioRole);
    const limparFavorito = useUsuarioStore((s) => s.limparFavoritos);
    const [loginInvalido, setLoginInvalido] = useState(false);

    useEffect(() => {
        setUsuarioLogado(0); //Logout ao entrar na tela de login
        setUsuarioRole("");
        limparFavorito();
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<FormLogin>();

    const { mutate: efetuarLogin, error: errorEfetuarLogin } = useEfetuarLogin();

    const submit = ({ role, conta, senha }: FormLogin) => {
      const usuario: Usuario = { role, conta, senha };

      efetuarLogin(usuario, {
        onSuccess: (tokenResponse: TokenResponse) => {
          if(tokenResponse.token > 0) {
            setUsuarioLogado(tokenResponse.token);
            setUsuarioRole(tokenResponse.role);
            if(location.state?.destino) {
              navigate(location.state.destino);
            } else {
              navigate("/");
            }
          }
          else {
            setLoginInvalido(true);
          }
        },
      });
    };

    if(errorEfetuarLogin) {
      throw errorEfetuarLogin;
    }

    return (
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        {loginInvalido && (
          <div className="row">
            <div className="col-lg-6">
              <div className="alert alert-danger fw-bold" role="alert">
                Login inválido!
              </div>
            </div>
          </div>
        )}
        <div className="row mb-2">
          <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">
            Conta
          </label>
          <div className="col-lg-5">
            <input
              {...register("conta")} // onChange(), onBlur(), name, ref
              type="text"
              id="conta"
              className="form-control form-control-sm"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
            Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("senha")}
              type="password"
              id="senha"
              className="form-control form-control-sm"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <button
              type="submit"
              style={{
                backgroundColor: "#FFC3A5",
                border: "2px solid black",
                color: "#444",
                fontSize: "1rem",
                transition: "all 0.25s ease-in-out",
                padding: "0.5em 1em",
                borderRadius: "0.3em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF8866";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFC3A5";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={(e) => {
                e.currentTarget.style.backgroundColor = "#FF8866";
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
    );
};

export default LoginForm;