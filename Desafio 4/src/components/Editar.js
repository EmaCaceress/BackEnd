import { useEffect, useState } from "react";

const Editar= () =>{
    const [objeto, setObjeto] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [id, setId] = useState('');

    useEffect(()=>{
        fetch(`/api/productos/${id}`,{method:"GET"}).then((res) => res.json()).then((data) => setObjeto(data))
    },[id]);
  
    const changeTitulo = (event) => {
        setTitulo(event.target.value)
    }

    const changePrecio = (event) => {
        setPrecio(event.target.value)
    }

    const changeId = (event) =>{
        setId(event.target.value)
    }
    
    const modificacion = () =>{
        let producto = {
            indice:objeto.indice,
            producto: {
                id:objeto.producto?.id,
                titulo: titulo,
                precio: precio,
            }
        }
        fetch(`/api/productos/${JSON.stringify(producto)}`,{method:"PUT"}).then((data) => setObjeto(data))
    }
    
    return (
        <div className='body'>
            {   
                id === ''
                ?   <div>
                        <label>Ingrese un id para modificar</label>
                        <input type="text" className="form-control" value={id} onChange={changeId} id="inputAddress" name="id"/>
                    </div>
                :   objeto !== null 
                    &&  <div className="form-group">
                            <h1>{objeto.producto?.id}</h1>
                            <label htmlFor="inputAddress">Titulo</label>
                            <input type="text" className="form-control" value={titulo} onChange={changeTitulo} id="inputAddress" name="title" placeholder={objeto.producto?.titulo}/>
                            <label htmlFor="inputAddress">Precio</label>
                            <input type="text" className="form-control" value={precio} onChange={changePrecio} id="inputAddress" name="precio" placeholder={objeto.producto?.precio}/>
                            <button type="submit" className="btn btn-primary" onClick={modificacion}>Sign in</button>
                        </div>  
                }
                
        </div>
    );
}

export default Editar;