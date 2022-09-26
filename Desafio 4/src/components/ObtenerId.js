import { useState } from "react";

const ObtenerId = () =>{
    const [id, setid] = useState('');
    const [objeto, setObjeto] = useState(null);
  
    const changeId = (event) => {
      setid(event.target.value)
    }

    const peticion = () => {
      fetch(`/api/productos/${id}`,{method:"GET"}).then((res) => res.json()).then((data) => setObjeto(data.producto));
    }
    
    return (
      <>
        <div className='body'>
          <label>ID</label>
          <input type="text" className="form-control" name="id" placeholder="" value={id} onChange={changeId} />
          <button type="submit" className="btn btn-primary" onClick={peticion}>Sign in</button>
          {
            objeto !== null && <h1>{objeto?.id}-{objeto?.titulo}:{objeto?.precio}</h1>
          }
        </div>
      </>
    );
}

export default ObtenerId;