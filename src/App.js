
import React, { useState, useEffect } from 'react';
import './App.css';
import TabelaDeDuasSemanas from './TabelaDeDuasSemanas';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuadroAviso from './components/widgets/QuadroAviso';
import Menu from './components/widgets/Menu';
import Home from './mobile/Home';
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Exemplo de breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {
        isMobile ? <Home/> : <Desktop/>
    }

    </>
  );
}

export default App;

const Desktop = () => {
  return (<>
    <div className="row w-100 content">
      <div className="col col-md-3 bg-sudccess side-bar p-0">
        <div className='calendario bg-sudccess'>
          <Menu />
        </div>
        <div className='avisos bgwarning d-flex justify-content-center align-items-start container '>
          <QuadroAviso />
        </div>
      </div>
      <div className="col col-md-9 col-12 overflow-scroll agenda p-0">
        <TabelaDeDuasSemanas />
      </div>
    </div></>)
}