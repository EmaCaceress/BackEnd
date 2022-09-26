import {Link} from "react-router-dom"

const Header = () =>{
    return(
        <header>
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/subir">Agregar</Link>
                <Link to="/eliminarId">Eliminar</Link>
                <Link to="/obtenerTodos">Obtener Todos</Link>
                <Link to="/obtenerId">Obtener Uno</Link>
                <Link to="/editar">Editar</Link>
            </nav>
        </header>
    )
}

export default Header;