import { useEffect, useState } from "react"
const Inicio = () => {

    return (
        <div className='body'>
            <h1 className="bienvenida">Bienvenido</h1>
            <h2>Instrucciones:</h2>
            <h3>
                Elija como quiere ingresar, y luego se le habilitaran las opciones que tiene para
                interactuar con el servidor.
                Luego cree un carrito, y con el id proporcionado indique en la seccion "obtener productos" el carrito a utilizar,
                para asi, poder agregar productos a su carrito.
            </h3>
        </div>
    );
}

export default Inicio;