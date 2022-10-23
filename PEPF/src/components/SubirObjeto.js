import { useState } from "react";

const SubirObjeto = () => {
    const [objeto, setObjeto] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');

    const changeTitulo = (event) => {
        setTitulo(event.target.value)
    }

    const changePrecio = (event) => {
        setPrecio(event.target.value)
    }

    const subida = () => {
        let producto = {
            title: titulo,
            price: precio,
        }
        fetch(`/api/productos`, { method: "POST", body: JSON.stringify(producto), headers: { 'Content-Type': 'application/json' } }).then((res) => res.json()).then((data) => setObjeto(data))
    }
    return (
        <>
            <div className="form-group">
                <label htmlFor="inputAddress">Producto</label>
                <input type="text" className="form-control" value={titulo} onChange={changeTitulo} id="inputAddress" name="title" placeholder="mesa" />
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress2">Precio</label>
                <input type="text" className="form-control" value={precio} onChange={changePrecio} id="inputAddress" name="precio" placeholder="1500" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={subida}>Sign in</button>
            {
                objeto !== null && <h1>{objeto?.id}-{objeto?.title}:{objeto?.price}</h1>
            }
        </>
    )
}

export default SubirObjeto;