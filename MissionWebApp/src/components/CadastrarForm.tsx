import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import type { Usuario } from "../interface/Usuario";
import useUsuarioStore from "../store/useUsuarioStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCadastrarUsuario from "../hooks/useCadastrarUsuario";


const regexConta = /^[a-zA-z]+$/;

const schema = z.object({
  conta: z
    .string()
    .nonempty({ message: "A 'conta' deve ser informado!" })
    .regex(regexConta, { message: "A 'conta' deve conter apenas letras!" })
    .min(3, { message: "A 'conta' deve ter no mínimo 3 caracteres!" }),
  senha: z
    .string()
    .nonempty({ message: "A 'senha' deve ser informado!" })
    .min(3, { message: "A 'senha' deve ter no mínimo 3 caracteres!" }),
  confirmarSenha: z
    .string()
    .nonempty({ message: "A 'confirmação de senha' deve ser informado!" })
    .min(3, { message: "A 'confirmação de senha' deve ter no mínimo 3 caracteres!" }),
  role: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não conferem!",
  path: ["confirmarSenha"],
});

type CadastrarForm = z.infer<typeof schema>;

const CadastrarForm = () => {
  const setMensagem = useUsuarioStore((state) => state.setMensagem);

  const[cadastroInvalido, setcadastroInvalido] = useState(false);

  const handleCancelar = () => {
    reset();
    setcadastroInvalido(false);
  }

  const navigate = useNavigate();

  const { mutate: cadastrarUsuario, error: errorCadastrarUsuario } = useCadastrarUsuario();

  const { register, handleSubmit, reset, formState: {errors} } = useForm<CadastrarForm>({
    defaultValues: {
      conta: "",
      senha: "",
      confirmarSenha: "",
      role: "doador"
    },
    resolver: zodResolver(schema)
  });

  const submit = ({
    conta,
    senha,
    role,
  }: CadastrarForm) => {
      const usuario: Usuario = {
        role: role,
        conta: conta,
        senha: senha,
      };

      console.log("Cadastrando usuário:", usuario);

      cadastrarUsuario(usuario, {
        onSuccess: (response: Boolean) => {
          if(response) {
            setMensagem("Usuário cadastrado com sucesso!");
            navigate("/entrar")
          }
          else {
            setcadastroInvalido(true);
          }
        },
      });
    }

  if(errorCadastrarUsuario) {
    throw errorCadastrarUsuario;
  }

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      {cadastroInvalido && (
        <div className="row">
          <div className="col-lg-6">
            <div className="alert alert-danger fw-bold" role="alert">
              Cadastro não ocorreu!
            </div>
          </div>
        </div>
      )}

      <div className="col-xl-6">
        <div className="row mb-2">
          <label htmlFor="conta" className="col-xl-2 fw-bold">
            Conta
          </label>
          <div className="col-xl-10">
            <input
              {...register("conta")} // onChange, onBlur, name, ref
              type="text"
              id="conta"
              className={errors.conta ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
            />
            <div className="invalid-feedback">
              {errors.conta?.message}
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6">
        <div className="row mb-2">
          <label htmlFor="senha" className="col-xl-2 fw-bold">
            Senha
          </label>
          <div className="col-xl-10">
            <input
              {...register("senha")} // onChange, onBlur, name, ref
              type="password"
              id="senha"
              className={errors.senha ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
            />
            <div className="invalid-feedback">
              {errors.senha?.message}
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6">
        <div className="row mb-2">
          <label htmlFor="confirmarSenha" className="col-xl-2 fw-bold">
            Confirmar Senha
          </label>
          <div className="col-xl-10">
            <input
              {...register("confirmarSenha")} // onChange, onBlur, name, ref
              type="password"
              id="confirmarSenha"
              className={errors.confirmarSenha ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
            />
            <div className="invalid-feedback">
              {errors.confirmarSenha?.message}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="col-xl-6">
          <div className="col-xl-10 d-flex">
            <div className="w-100">
              <button
                id="botao"
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
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="col-xl-6">
          <div className="col-xl-10 d-flex">
            <div className="w-100">
              <button
                onClick={() => handleCancelar()}
                id="botao"
                type="button"
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
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </form>
  );


};

export default CadastrarForm;