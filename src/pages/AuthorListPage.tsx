import AuthorServiceInterface from "../services/interfaces/AuthorServiceInterface";
import AuthorRestService from "../services/concrete/rest/AuthorRestService";
import Navbar from "../components/Navbar";
import AuthorDto from "../model/AuthorDto";
import { Component, ReactNode, useState } from "react";
import {format} from 'date-fns';
import "../css/listpage.css"
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';



type AuthorArray = {authorList: AuthorDto[]};

const authorService: AuthorServiceInterface = new AuthorRestService();

export default class AuthorListPage extends Component<{}, AuthorArray> {
  

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      authorList: []
    };
  }

  authorRow(author: AuthorDto){
    return(
      <div className="element">
      <div className="crud-buttons">
        <ModalAuthorDelete author={author}/>
        <Link className="btn btn-primary" to={`/updateAuthor/${author.id}`}>Atualizar</Link>
      </div>
      <div className="register">
        <h4 className="authorName">Autor {author.name}</h4>
        <p className="fields">
          <p className="authorBirthDate">
            <span>Data de Nascimento: </span>
            <span>{author.birthDate.toString()}</span>
          </p>
          <p className="birthPlace">
            <span>Nacionalidade: </span>
            <span>{author.birthPlace}</span>
          </p>
        </p>
      </div>
      </div>
    );
  } 

  authorList(){
    return this.state.authorList.map((author: AuthorDto) => this.authorRow(author));
  }

  async componentDidMount() {
    var authorList = await authorService.findAll();
    this.setState({authorList});
  }

  render(){
    return(
      <>
        <header>
          <Navbar/>
        </header>
        <main className="main-center">
          <h2>Lista de Autores</h2>
          <div className="list">{this.state.authorList.map((author: AuthorDto) =>this.authorRow(author))}</div>
        </main>
      </>
    );
  }
};


interface ModalAuthorDeleteProps{
  author: AuthorDto;
}

export function ModalAuthorDelete({author} : ModalAuthorDeleteProps){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <Button variant="primary" onClick={handleShow}>
        Excluir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Você tem certeza?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja deletar {author.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <form action="" onSubmit={
            async(event)=>{ 
              event.preventDefault();
              await authorService.deleteById(author.id!);
              window.location.reload();
            }
          }>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
    </>
  );
}
