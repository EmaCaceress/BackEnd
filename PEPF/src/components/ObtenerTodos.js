import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
const ObtenerTodos = () => {
  const [objetos, setObjetos] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    fetch(`/api/productos`, { method: "GET" }).then((res) => res.json()).then((data) => setObjetos(data));
  }, []);

  const changeId = (event) => {
    setId(event.target.value)
  }

  const subirProducto = (id_prod) => {
    fetch(`api/carrito/${id}/productos/${id_prod}`, { method: "POST", headers: { 'Content-Type': 'application/json' } }).then((res) => res.json());
  }

  return (
    <div className='body'>
      <label htmlFor="inputAddress">Indique id de carrito</label>
      <input type="text" placeholder="43" value={id} onChange={changeId} />
      {
        objetos !== null
          ? objetos?.map((obj, i) => {
            return (
              <div className="container__card" key={i}>
                <h1 className="container__title" >{obj.title}</h1>
                <h1 className="container__price" >{obj.price}</h1>
                <div className="container__buttons" >
                  <input type="submit" value="Agregar" onClick={() => subirProducto(obj.id)} />
                  <Link to="/obtenerId"><input type="submit" value="Ver Mas" /></Link>
                </div>
                <div className="container__divImg">
                  <img className="container__img" src={obj.url} />
                </div>
              </div>
            )
          })
          : <h1>No hay ningun producto</h1>
      }
    </div>
  );
}

export default ObtenerTodos;