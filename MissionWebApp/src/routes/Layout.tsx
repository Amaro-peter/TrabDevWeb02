import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const Layout = () => {
  return (
    <>
        <NavBar />
        <div className="container-fluid pt-3 mt-3">
            <Outlet />
        </div>
        <Footer />
    </>
  );
}

export default Layout;