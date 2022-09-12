class Usuarios{
    /*  constructor que pide de entrada:
    Nombre, apellido, libros o no, mascotas o no
    y las almacena
    */
    constructor(nombre, apellido, libros, mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros || [];
        this.mascotas=mascotas || [];
    }

    // Metodo que retorna el nombre completo del usuario
    getFullName(){
        const nombreCompleto=this.nombre+" "+this.apellido;
        return nombreCompleto;
    }
    
    // Metodo que añade mascotas a la propiedad mascotas
    addMascota(nombre){
        this.mascotas.push(nombre);
        console.log(this.mascotas);
    }

    // Metodo que contea todos las mascotas que posee el usuario
    countMascota(){
        return this.mascotas.length;
    }

    // Metodo que agrega libros al array libros del objeto
    addBook(autor, titulo){
        this.libros.push({autor:autor,titulo:titulo})
        console.log(this.libros);
    }

    // Metodo que retorna en un array todos los titulos de
    // los libros del usuario
    getBookName(){
        const nombreLibros=[];
        this.libros.map(e =>{
            nombreLibros.push(e.titulo);
        });
        return nombreLibros;
    }
}

// creamos un nuevo usuario
let usuario = new Usuarios("Emanuel","Chacon",);

console.log(usuario.getFullName()); // lo imprimimos

// Subimos a addMascota las mascotas del usuario
usuario.addMascota("Pipita");
usuario.addMascota("ManFredo");

console.log(usuario.countMascota()); // Imprimimos las mascotas

// Subimos a addBook los titulos con sus autores
usuario.addBook("Joanne Rowling​","Harry Potter");
usuario.addBook("juli​","la bella y la bestia");

console.log(usuario.getBookName()); // Imprimimos los titulos de los libros