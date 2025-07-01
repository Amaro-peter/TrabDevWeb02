import { NavLink } from "react-router-dom";
import "./css/Style.css";

const Footer = () => {
  return (
    <>
        <footer className="footer">
            <div className="container">
                <div className="row">
                <div className="col-lg-6">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                    <li>
                        <NavLink to="#">Quem somos</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Guia do desenvolvedor</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Guia do projeto social</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Juntos+</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Dúvidas</NavLink>
                    </li>
                    </ul>
                </div>

                <div className="col-lg-6">
                    <h5>Informações de contato</h5>
                    <ul className="list-unstyled">
                    <li>
                        <i className="fas fa-university"></i> Fundação Mission App
                    </li>
                    <li>
                        <i className="fas fa-phone"></i> +55 11 99999-9999
                    </li>
                    <li>
                        <i className="fas fa-envelope"></i>
                        <NavLink to="mailto:contato@missionapp.com.br">contato@missionapp.com.br</NavLink>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
    </>
  )
};

export default Footer;