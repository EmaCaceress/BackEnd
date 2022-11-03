import { useState } from "react";
import CrearCarrito from "./CrearCarrito";
import EliminarCarrito from "./EliminarCarrito";

const Carrito = () => {
    const [objeto, setObjeto] = useState(null);
    const [id, setId] = useState('');

    const changeId = (event) => {
        setId(event.target.value)
    }

    const obtenerProductos = () => {
        fetch(`/api/carrito/${id}/productos`, { method: "GET" }).then((res) => res.json()).then((data) => setObjeto(data));
    }

    const eliminarProducto = (id_prod) => {
        fetch(`api/carrito/${id}/productos/${id_prod}`, { method: "DELETE", headers: { 'Content-Type': 'application/json' } }).then((res) => res.json()).then((data) => setObjeto(data));
    }
    return (
        <div className='body'>
            <CrearCarrito></CrearCarrito>
            <EliminarCarrito></EliminarCarrito>
            <div>
                <label>Ingrese el carrito a buscar</label>
                <input type="number" className="form-control" value={id} onChange={changeId} id="inputAddress" name="id" />
                <input type="submit" value="Enviar" onClick={obtenerProductos} />
            </div>
            {
                objeto !== null
                && objeto.productos?.map((obj, i) => {
                    return (
                        <div className="container__card" key={i}>
                            <h1 className="container__title" >{obj.title}</h1>
                            <h1 className="container__price" >{obj.price}</h1>
                            <input className="container__buttons" type="submit" value="Eliminar" onClick={() => eliminarProducto(obj.id)} />
                            <div className="container__divImg">
                                <img className="container__img" src={obj.url} alt="hola" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Carrito;