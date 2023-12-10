import { Link, useNavigate } from "react-router-dom";
import '../hojas.de-estilo/NavBar.css';

const Navbar = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="btn btn-outline-primary" to="/mainview">
          Inicio
        </Link>
        <Link className="btn btn-outline-primary" to="/aboutpage">
          Acerca de BabyÑam
        </Link>
        <Link className="btn btn-outline-primary" to="/generaterecipe">
          Generar Receta
        </Link>
        <div className="close_button">

          {token ? (
            <Link to="/" onClick={logout}>
              Cerrar Sesión
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
