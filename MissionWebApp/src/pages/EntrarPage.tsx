import { useEffect, useState } from "react";
import CadastrarForm from "../components/CadastrarForm";
import LoginForm from "../components/LoginForm";
import useUsuarioStore from "../store/useUsuarioStore";

const EntrarPage = () => {
    const mensagem = useUsuarioStore((s) => s.getMensagem());
    const setMensagem = useUsuarioStore((s) => s.setMensagem);

    const [showLogin, setShowLogin] = useState(true);

    const handleToggle = () => {
        setShowLogin((prev) => !prev);
    };

    useEffect(() => {
        if(mensagem) {
            handleToggle();
            const timer = setTimeout(() => {
                setMensagem("");
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [mensagem, setMensagem]);

    return (
        <div
            className="container-fluid py-5"
            style={{
                backgroundColor: "antiquewhite",
                marginTop: "64px",
                minHeight: "100vh",
                borderBottom: "2px solid black",
            }}
        >
            <div className="container" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
                <div className="card shadow-sm" style={{ border: "2px solid black" }}>
                    <div className="card-body py-5">
                        <h5 style={{ fontSize: "20px", fontWeight: "bold", color: "#c54708" }} className="mb-3">
                            Página de {showLogin ? "Login" : "Cadastro"}
                        </h5>

                        <hr className="mt-1" />

                        {mensagem && (
                            <div className="alert alert-primary alert-dismissible fade show mt-3" role="alert">
                                <strong>Sucesso!</strong> {mensagem}
                            </div>
                        )}

                        <div className="mt-4">
                            {showLogin ? <LoginForm /> : <CadastrarForm />}
                        </div>

                        <div className="mt-3">
                            <button type="button" 
                                className="btn"
                                style={{ fontSize: "20px", fontWeight: "bold", color: "#c54708", padding: "10px 20px" }}
                                onClick={handleToggle}
                            >
                                {showLogin ? "Sem conta? Cadastre-se" : "Já tem conta? Entre"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntrarPage;