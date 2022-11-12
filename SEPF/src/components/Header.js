import { useState } from "react";
import { Link } from "react-router-dom"

const Header = () => {
    const [valor, setValor] = useState()

    const logueo = (valor) => {
        setValor(valor)
        let login
        valor
            ? login = { user: "admin", cargo: true }
            : login = { user: "usuario", cargo: false }
        console.log(login)
        fetch(`/login`, { method: "POST", body: JSON.stringify(login), headers: { 'Content-Type': 'application/json' } }).then((res) => res.json());
    }

    return (
        <header>
            {
                valor === undefined
                    ? <div className="login">
                        <button type="submit" className="btn btn-primary" name="admin" onClick={() => logueo(true)}>Admin</button>
                        <button type="submit" className="btn btn-primary" name="user" onClick={() => logueo(false)}>User</button>
                    </div>
                    : valor === true
                        ? <nav>
                            <Link to="/">Inicio</Link>
                            <Link to="/subir">Agregar</Link>
                            <Link to="/eliminarId">Eliminar</Link>
                            <Link to="/obtenerTodos">Obtener Todos</Link>
                            <Link to="/obtenerId">Obtener Uno</Link>
                            <Link to="/editar">Editar</Link>
                            <Link to="/carrito"><input type="submit" value="Carrito" /></Link>
                        </nav>
                        : <nav>
                            <Link to="/">Inicio</Link>
                            <Link to="/obtenerTodos">Obtener Todos</Link>
                            <Link to="/obtenerId">Obtener Uno</Link>
                            <Link to="/carrito"><input type="submit" value="Carrito" /></Link>
                        </nav>
            }
        </header>
    )
}

export default Header;