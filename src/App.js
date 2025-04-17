
import React from 'react';
import './App.css';
import TabelaDeDuasSemanas from './TabelaDeDuasSemanas';
import 'bootstrap/dist/css/bootstrap.min.css'
import QuadroAviso from './components/widgets/QuadroAviso';
function App() {
  

  return (
    <>
      {/* <TabelaDeDuasSemanas/> */}
      <div className="row w-100 content">
        <div className="col col-md-3 bg-sudccess side-bar p-0">
          <div className='calendario bg-success'>
            
          </div>
          <div className='avisos bgwarning d-flex justify-content-center align-items-center'>
            <QuadroAviso/>
          </div>
        </div>
        <div className="col col-md-9 overflow-scroll agenda p-0">
          <TabelaDeDuasSemanas/>
        </div>
      </div>
    </>
  );
}

export default App;