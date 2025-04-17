import data from '../../avisos.json'
import { useState } from 'react'
const QuadroAviso = () => {

    const [avisos, setAvisos] = useState(data)






    return (
        <>

            <ul className="list-group w-10 mt-5">
                <h2 className="text-center">Avisos gerais</h2>

                {

                    avisos.map((aviso)=>(
                        <li class="list-group-item">{aviso.aviso}</li>
                    ))

                }
            </ul>
        </>
    )
}

export default QuadroAviso