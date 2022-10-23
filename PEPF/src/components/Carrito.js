import { useEffect, useState } from "react";

const Carrito = () => {
    const [objetos, setObjetos] = useState(null);

    useEffect(() => {
        fetch(`/api/productos`, { method: "GET" }).then((res) => res.json()).then((data) => setObjetos(data));
    }, []);

    return (
        <div className='body'>
            {
                objetos !== null
                    ? objetos?.map((obj, i) => {
                        return (
                            <div className="container__card" key={i}>
                                <h1 className="container__title" >{obj.title}</h1>
                                <h1 className="container__price" >{obj.price}</h1>
                                <div className="container__buttons" >
                                    <input type="submit" value="Agregar" />
                                    <input type="submit" value="Ver Mas" />
                                </div>
                                <div className="container__divImg">
                                    <img className="container__img" src="https://phantom-marca.unidadeditorial.es/e1e65aab8cbcb632d9c8359b2b6840f9/resize/1320/f/jpg/assets/multimedia/imagenes/2021/07/17/16265320344770.jpg" />
                                </div>
                            </div>
                        )
                    })
                    : <h1>No hay ningun producto</h1>
            }
        </div>
    );
}

export default Carrito;