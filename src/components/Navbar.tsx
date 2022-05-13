import NavItem from './NavItem';


interface NavbarProps{
  page: boolean;
  goToAuthorRegisterPage: ()=> void;
  goToBookRegisterPage: ()=> void;
}

export default function Navbar(props: NavbarProps){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Biblioteca Farias</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <NavItem page={props.page} goToPage={props.goToAuthorRegisterPage} label={'Cadastrar Autor'}/>
        <NavItem page={!props.page} goToPage={props.goToBookRegisterPage} label={'Cadastrar Obra'}/>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Cadastrar</a>
          <div className="dropdown-menu">
            <a className={`dropdown-item `+ (props.page ? "active" : "")} href="#"
              onClick={
                (event)=>{
                  event.preventDefault();
                  props.goToAuthorRegisterPage();
                }
              }
            >Autor</a>
            <a className={`dropdown-item `+ (props.page ? "" : "active")}  href="#"
              onClick={
                (event)=>{
                event.preventDefault();
                props.goToBookRegisterPage()
                }
              }
            >Obra</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}