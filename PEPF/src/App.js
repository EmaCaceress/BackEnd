import './App.css';
import ObtenerId from './components/ObtenerId';
import ObtenerTodos from './components/ObtenerTodos';
import SubirObjeto from './components/SubirObjeto';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import EliminarId from './components/EliminarId';
import Editar from './components/Editar';
import Carrito from './components/Carrito';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ObtenerTodos />} />
          <Route path='/subir' element={<SubirObjeto />} />
          <Route path='/obtenerTodos' element={<ObtenerTodos />} />
          <Route path='/obtenerId' element={<ObtenerId />} />
          <Route path='/eliminarId' element={<EliminarId />} />
          <Route path='/editar' element={<Editar />} />
          <Route path='/carrito' element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
