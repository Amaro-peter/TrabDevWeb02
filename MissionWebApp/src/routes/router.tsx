import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import GuiaDoDesenvolvedor from "../pages/GuiaDoDesenvolvedorPage";
import GuiaDoProjetoSocial from "../pages/GuiaDoProjetoSocialPage";
import JuntosMais from "../pages/JuntosMaisPage";
import DoacaoPage from "../pages/DoacaoPage";
import CardsPorSlugCategoria from "../pages/CardsPorSlugCategoria";
import EntrarPage from "../pages/EntrarPage";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";
import FavoritosPage from "../pages/FavoritosPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ProjetosSociais from "../pages/ProjetosSociaisPage";
import ProjetoSocialPage from "../pages/ProjetoSocialPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "/guiaDoDesenvolvedor",
                element: <GuiaDoDesenvolvedor />
            },
            {
                path: "/guiaDoProjetoSocial",
                element: <GuiaDoProjetoSocial />
            },
            {
                path: "/juntosMais",
                element: <JuntosMais />
            },
            {
                path: "/facaUmaDoacao",
                element: <DoacaoPage />,
                children: [
                    {
                        path: ":slugCategoria?",
                        element: <CardsPorSlugCategoria />
                    }
                ]
            },
            {
                path: "/entrar",
                element: <EntrarPage />
            },
            {
                path: "/projetos",
                element: <ProjetosSociais />
            },
            {
                path: "projetos/:id",
                element: <ProjetoSocialPage />
            }
        ]
    },

    {
        path: "/",
        element: <PrivateRoutes />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "favoritos",
                element: <FavoritosPage />
            },
            {
                path: "carrinho",
                element: <CarrinhoPage />
            }
        ]
    }
]);

export default router;