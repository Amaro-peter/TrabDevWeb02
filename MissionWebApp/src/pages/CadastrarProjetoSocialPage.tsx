import ProjetoSocialForm from "../components/ProjetoSocialForm"


const CadastrarProjetoSocialPage = () => {
    return (
        <>
            <div
                className="container-fluid py-5 w-100"
                style={{ backgroundColor: 'antiquewhite', marginTop: '64px' }}
            >
                <div className="container" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
                    <section id="titulo" className="mb-5">
                        <div className="card shadow-sm" style={{ border: '2px solid black' }}>
                            <div className="card-body text-center py-5">
                                <h1 style={{ color: '#c54708' }} className="mb-3">
                                    Cadastramento de Projetos Sociais
                                </h1>
                            </div>
                        </div>
                    </section>
                    <ProjetoSocialForm />
                </div>
            </div>
        </>  
    )
}

export default CadastrarProjetoSocialPage