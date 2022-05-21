import { Link, NavLink } from 'react-router-dom';
import NavItem from './NavItem';


export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Biblioteca Farias</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavItem link="#" label={'Autor'} appendClassName="dropdown">
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/registerAuthor"> Cadastrar Autor </NavLink>
                <NavLink className="dropdown-item" to="/listAuthors"> Listar Autores </NavLink>
              </div>
            </NavItem>
            <NavItem link="#" label={'Obra'} appendClassName="dropdown">
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/registerWork"> Cadastrar Obra </NavLink>
                <NavLink className="dropdown-item" to="/listWorks"> Listar Obras </NavLink>
              </div>
            </NavItem>
          </ul>
        </div>
        
      </div>
    </nav>
  );
}
