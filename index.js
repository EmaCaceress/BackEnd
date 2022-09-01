class Usuarios{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros || [];
        this.mascotas=mascotas || [];
    }

    getFullName(){
        const nombreCompleto=this.nombre+" "+this.apellido;
        return nombreCompleto;
    }
    
    addMascota(nombre){
        this.mascotas.push(nombre);
        console.log(this.mascotas);
    }

    countMascota(){
        return this.mascotas.length;
    }

    addBook(autor, titulo){
        this.libros.push({autor:autor,titulo:titulo})
        console.log(this.libros);
    }

    getBookName(){
        const nombreLibros=[];
        this.libros.map(e =>{
            nombreLibros.push(e.titulo);
        });
        return nombreLibros;
    }
}

let usuario = new Usuarios("Emanuel","Chacon",);

console.log(usuario.getFullName());
usuario.addMascota("Pipita");
usuario.addMascota("ManFredo");
console.log(usuario.countMascota());
usuario.addBook("Joanne Rowling​","Harry Potter");
usuario.addBook("juli​","la bella y la bestia");
console.log(usuario.getBookName());