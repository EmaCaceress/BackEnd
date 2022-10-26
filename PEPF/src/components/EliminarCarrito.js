import { useEffect, useState } from "react";

const EliminarCarrito = () => {
    const [id, setId] = useState('');
    const [eliminado, setEliminado] = useState('');


    const eliminarCarrito = () => {
        fetch(`/api/carrito/${id}`, { method: "DELETE" }).then((res) => res.json()).then((data) => setEliminado(data));
    }

    return (
        <div className='body'>
            <label>indique el carrito a eliminar</label>
            <input type="text" placeholder="12" value={id} onChange={(event) => setId(event.target.value)} />
            <input type="submit" value="Eliminar carrito" onClick={eliminarCarrito} />
            {
                eliminado !== ''
                && <h1>Tu Carrito con el id "{eliminado}" a sido eliminado</h1>
            }
        </div>
    );
}

export default EliminarCarrito;