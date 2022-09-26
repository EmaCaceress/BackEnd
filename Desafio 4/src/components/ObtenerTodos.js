import { useEffect, useState } from "react";

const ObtenerTodos= () =>{
    const [objetos, setObjetos] = useState(null);
    let i=0;
    useEffect(()=>{
      fetch(`/api/productos`,{method:"GET"}).then((res) => res.json()).then((data) => setObjetos(data));
    },[]);
  
    return (
        <div className='body'>
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

export default ObtenerTodos;