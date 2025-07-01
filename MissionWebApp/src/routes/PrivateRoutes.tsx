import { Navigate, useLocation } from "react-router-dom";
import useUsuarioStore from "../store/useUsuarioStore";
import Layout from "./Layout";


const PrivateRoutes = () => {
    const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
    const location = useLocation();

    if(usuarioLogado) {
        return <Layout />;
    }
    else {
        return <Navigate to={"/entrar"} state={{destino: location.pathname}} />;
    }
};
export default PrivateRoutes;