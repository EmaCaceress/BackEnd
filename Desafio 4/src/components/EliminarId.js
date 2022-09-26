import { useState } from "react";

const EliminarId = () =>{
    const [id, setid] = useState('');
    const [objetos, setObjetos] = useState(null);
    let i=0;
    const changeId = (event) => {
      setid(event.target.value)
    }

    const peticion = () => {
      fetch(`/api/productos/${id}`,{method:"DELETE"}).then((res) => res.json()).then((data) => setObjetos(data));
    }
    
    return (
        <div className='body'>
          <label>ID</label>
          <input type="text" className="form-control" name="id" placeholder="" value={id} onChange={changeId} />
          <button type="submit" className="btn btn-primary" onClick={peticion}>Sign in</button>
          {
            objetos !== null && objetos?.map(obj => {
                return (
                  <div key={i++}>
                    <h1 key={i++}>{obj.titulo}</h1>
                    <h1 key={i++}>{obj.precio}</h1>
                  </div>
                )
              })
          }
        </div>
    );
}

export default EliminarId;