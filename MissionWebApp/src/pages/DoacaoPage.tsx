import { NavLink, Outlet } from "react-router-dom";

const DoacaoPage = () => {
  const categories = [
    { name: "Ver todos", path: "/facaUmaDoacao" },
    { name: "Educação", path: "/facaUmaDoacao/educacao" },
    { name: "Saúde e bem-estar", path: "/facaUmaDoacao/saude" },
    { name: "Inclusão social", path: "/facaUmaDoacao/inclusao" },
  ];

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
      <div className="container text-center" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <section id="titulo" className="mb-5">
            <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                <div className="card-body text-center py-5">
                    <h1 style={{ color: '#c54708' }} className="mb-3">
                        Ajude um Projeto Social
                    </h1>
                    <p className="fw-bold fs-4">
                        Selecione uma categoria para explorar projetos sociais incríveis.
                    </p>
                </div>
            </div>
        </section>

        <div className="row justify-content-center g-3">
          {categories.map((cat, idx) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={idx}>
              <NavLink
                to={cat.path}
                className="d-block py-3 px-4 rounded-3 shadow-sm text-decoration-none fw-medium"
                style={{
                  backgroundColor: "#fff",
                  border: '2px solid black',
                  color: "#444",
                  fontSize: "1rem",
                  transition: "all 0.25s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffc0a8";  
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";  
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffc0a8";
                }}
              >
                {cat.name}
              </NavLink>
            </div>
          ))}
        </div>

        <div className="row mt-3 justify-content-center g-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoacaoPage;
