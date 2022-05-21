import WorkServiceInterface from "../services/interfaces/WorkServiceInterface";
import WorkRestService from "../services/concrete/rest/WorkRestService";
import AuthorServiceInterface from "../services/interfaces/AuthorServiceInterface";
import AuthorRestService from "../services/concrete/rest/AuthorRestService";
import Navbar from "../components/Navbar";
import WorkDto from "../model/WorkDto";
import { Component, useState} from "react";
import "../css/listpage.css"
import AuthorDto from "../model/AuthorDto";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const authorService: AuthorServiceInterface = new AuthorRestService();
const workService: WorkServiceInterface = new WorkRestService();


interface ModalWorkDeleteProps{
  work: WorkDto;
}

export function ModalWorkDelete({work} : ModalWorkDeleteProps){
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
        <Modal.Body>Você tem certeza que deseja deletar {work.title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <form action="" onSubmit={
            async(event)=>{ 
              event.preventDefault();
              await workService.deleteById(work.id!);
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

function defaultAuthor() : AuthorDto{
  return {
    id: -1,
    name: "",
    birthDate: new Date(),
    birthPlace: ""
  }
}


interface AuthorInfoProps {
  id: number;
}

type AuthorState = {
  author: AuthorDto;
};

export class AuthorInfo extends Component<AuthorInfoProps,AuthorState>{

  constructor(props: AuthorInfoProps, state: AuthorState){
    super(props);
    this.state = {
      author: defaultAuthor()
    }
  }

  async componentDidMount() {
    var author = await new AuthorRestService().findById(this.props.id);
    this.setState({author});
  }


  render(){
    return(
      <>
      <div key={this.props.id} className="author-info">
        <strong>
          <p className="author-info-name">{this.state.author.name}</p>
        </strong>
        <div className="author-info-birth">{this.state.author.birthDate.toString()}</div>
        <div className="author-info-birthplace">{this.state.author.birthPlace}</div>
      </div>
      </>
    );
  }
}


type workArray = {workList: WorkDto[]};

export default class WorkListPage extends Component<{}, workArray> {

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {
      workList: []
    };
  }


  workRow(work: WorkDto){
    return(
      <div className="element">
        <div className="crud-buttons">
          <ModalWorkDelete work={work}/>
          <Link className="btn btn-primary" to={`/updateWork/${work.id}`}>Atualizar</Link>
        </div>
        <div className="register">
          <h3 className="work-title">{work.title}</h3>
          <div className="fields">
            <AuthorInfo id={work.authorId}/>
            <p className="workPublicationDate">
              <span>Data de Nascimento: </span>
              <span>{work.publicationDate.toString()}</span>
            </p>
            <p className="genre">
              <span>Gênero: </span>
              <span>{work.genre}</span>
            </p>
          </div>
        </div>
      </div>
    );
  } 

  workList(){
    return this.state.workList.map((Work: WorkDto) => this.workRow(Work));
  }

  async componentDidMount() {
    var workList = await workService.findAll();
    this.setState({workList});
  }

  render(){
    return(
      <>
        <header>
          <Navbar/>
        </header>
        <main className="main-center">
          <h2>Lista de Autores</h2>
          <div className="list">{this.state.workList.map((work: WorkDto) =>this.workRow(work))}</div>
        </main>
      </>
    );
  }
};

