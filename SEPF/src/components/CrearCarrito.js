import { useState } from "react";

const CrearCarrito = () => {
    const [id, setId] = useState('');

    const crearCarrito = () => {
        fetch(`/api/carrito`, { method: "POST" }).then((res) => res.json()).then((data) => setId(data));
    }

    return (
        <div className='body'>
            <input type="submit" value="Crear nuevo carrito" onClick={crearCarrito} />
            {
                id !== ''
                && <h1>Tu id de carrito es: {id}</h1>
            }
        </div>
    );
}

export default CrearCarrito;