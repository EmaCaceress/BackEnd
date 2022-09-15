const fs=require('fs');
let id=0;
let arrayProductos=[];

class Producto{
    constructor(title, price, url, id){
        this.title=title;
        this.price=price;
        this.url=url;
        this.id=id || null;
    }
}

class Contenedor{
    constructor(ruta){
        this.ruta=ruta;
    }

    // Metodo para subir al archivo nuevos objetos y agregarles sus respectivos Ids
    save = (objeto) =>{
        try{       
            if(objeto >= [])
                objeto.map(elemento=>{
                    elemento.id= id = id + 1;
                    arrayProductos.push(elemento)
                });
            else{
                objeto.id= id = id + 1;
                arrayProductos.push(objeto);
            }
            fs.writeFileSync(this.ruta, JSON.stringify(arrayProductos, null, 2), 'utf-8')
            console.log("Subida realizada correctamente");
            
        }
        catch(error){
            console.log("Hubo un error al subir el objeto: ", error.message);
        }
    }
    // Metodo para obtener el objeto del archivo producto, mediante id
    getById = id =>{
        try{ 
            return this.getAll()[id-1];
        }
        catch(error){
            console.log("Hubo un error al mostrar el objeto: ", error.message);
        }
    }
    // Metodo para obtener todos los objetos del archivo producto
    getAll = () =>{
        try{
            let contenido = JSON.parse(fs.readFileSync(this.ruta, 'utf-8'));
            return contenido;
        }
        catch(error){
            console.log("Hubo un error al leer el archivo: ", error.message);
        }
    }
    // Metodo para eliminar el objeto del archivo producto, mediante id
    deleteById = async (id) =>{
        try{
            const pos = arrayProductos.map(e => e.id).indexOf(id);
            pos !== -1  &&  arrayProductos.splice(pos, 1);
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProductos, null, 2))
                .then(()=>console.log("Objeto ",id," borrado correctamente"))
        }
        catch(error){
            console.log("Hubo un error al borrar el objeto: ", error.message);
        }
    }

    // Metodo para eliminar todos los objetos del archivo producto
    deleteAll= async ()=>{
        try{
            arrayProductos=[];
            await fs.promises.unlink(this.ruta)
                .then(()=>console.log("objetos borrados"))
        }
        catch(error){
            console.log("Hubo un error al borrar los objetos: ", error.message);
        }
    }

}

/* Objetos */

const moto= new Producto(
    title="moto",
    price="350.000",
    url="https://auteco.vteximg.com.br/arquivos/ids/218549-250-250/benelli-251s-verde-2022-foto1.png?v=637922146008800000"
);
const auto= new Producto(
    title="auto bmw",
    price="3.740.000",
    url="https://i.ytimg.com/vi/7ajGAJA4uYY/maxresdefault.jpg"
);
const bici= new Producto(
    title="Bicicleta Venzo",
    price="60.000",
    url="https://biciurbana.com.ar/11558-large_default/bicicleta-venzo-stinger-20-vel-shimano-deore.jpg"
);

const bd = new Contenedor("./stock/producto.json")

/* Subimos los objetos a la BD */
bd.save([moto, auto, bici]);

/* Ejecutamos */ 
const express=require('express');
const app=express();
const arrayProductosBajados=bd.getAll();
const PORT=8080;

const server= app.listen(PORT,()=>{
    console.log(`servidor express escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error)=>console.log(`Error en el servidor: ${error}`));

/* Muestra hola mundo en la ruta / */
app.get("/",(req, res)=>{
    res.send("<h1>HOLA MUNDO!</h1>");
})

/* Muestra todos los productos de la bd en la ruta /productos */
app.get("/productos",(req, res)=>{
    res.send(arrayProductosBajados);
})

/* Muestra un producto aleatorio en la ruta /productoRandom */
app.get("/productoRandom",(req, res)=>{
    const random=(max, min)=>{return Math.floor(Math.random() * (arrayProductosBajados.length - 1 + 1) + 1)}
    const productoRandom=bd.getById(random(3,1));
    res.send({producto:productoRandom});
})
