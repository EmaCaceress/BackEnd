import { useState } from "react";

const SubirObjeto = () => {
    const [objeto, setObjeto] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [codigo, setCodigo] = useState('');
    const [url, setUrl] = useState('');
    const [stock, setStock] = useState('');

    const changeTitulo = (event) => {
        setTitulo(event.target.value)
    }

    const changePrecio = (event) => {
        setPrecio(event.target.value)
    }

    const subida = () => {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let producto = {
            title: titulo,
            price: precio,
            description: descripcion,
            cod: codigo,
            url: url,
            timeStamp: hoy.toUTCString(),
            stock: stock,
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
            <div className="form-group">
                <label htmlFor="inputAddress2">Descripcion</label>
                <input type="text" className="form-control" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} id="inputAddress" name="precio" placeholder="1500" />
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress2">Codigo</label>
                <input type="text" className="form-control" value={codigo} onChange={(event) => setCodigo(event.target.value)} id="inputAddress" name="precio" placeholder="1500" />
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress2">Url de imagen</label>
                <input type="text" className="form-control" value={url} onChange={(event) => setUrl(event.target.value)} id="inputAddress" name="precio" placeholder="1500" />
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress2">Stock</label>
                <input type="text" className="form-control" value={stock} onChange={(event) => setStock(event.target.value)} id="inputAddress" name="precio" placeholder="1500" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={subida}>Sign in</button>
            {
                objeto !== null && <h1>{objeto?.id}-{objeto?.title}:{objeto?.price}</h1>
            }
        </>
    )
}

export default SubirObjeto;