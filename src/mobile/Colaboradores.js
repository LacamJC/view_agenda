import data from '../avisos.json'



const Colaboradores = () => {
    return (
        <>
            <div className="card mx-auto mt-4" style={{ width: '18rem' }}>
                <div className="card-header">
                    Nome do colaborador
                </div>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">Cliente: SECOR Dia: 20/04</li>
                    <li className="list-group-item">Cliente: BIOSAT Dia: 24/04</li>
                </ul>
            </div>
        </>
    )
}

export default Colaboradores