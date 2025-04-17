import Avisos from "./Avisos"
import Colaboradores from "./Colaboradores"

const Home = () => {

    const data = [1,2,3,4,5]

    return (
        <>
            <Avisos/>
            {
                data.map(()=>{
                    return(
                        <Colaboradores/>
                    )
                })
            }
    
        </>
    )
}

export default Home 