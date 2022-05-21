import {Component, FormEvent, useState} from "react";
import AuthorDto  from "../model/AuthorDto";
import FormGroup from '../components/FormGroup';
import DatePicker from "react-datepicker";
import Navbar from '../components/Navbar';
import WorkDto from "../model/WorkDto";
import {differenceInDays, parse} from "date-fns";
import WorkServiceInterface from "../services/interfaces/WorkServiceInterface";
import WorkRestService from "../services/concrete/rest/WorkRestService";
import AuthorRestService from "../services/concrete/rest/AuthorRestService";
import AuthorServiceInterface from "../services/interfaces/AuthorServiceInterface";


function defaultAuthor() : AuthorDto{
  return {
    id: -1,
    name: "",
    birthDate: new Date(),
    birthPlace: ""
  }
}

type AuthorArray = {authorList: AuthorDto[]};

export class AuthorOptions extends Component<{}, AuthorArray>{
  private authorService: AuthorServiceInterface = new AuthorRestService();

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state={
      authorList: []
    }
  }

  async componentDidMount() {
    var authorList = await this.authorService.findAll();
    this.setState({authorList});
  }

  authorOption(author: AuthorDto){
    return(
      <option key={author.id!} value={author.id!}>{author.name}</option>
    );
  }
  allAuthorOptions(){
    return (
      <>
        {[this.state.authorList.map((author : AuthorDto) => this.authorOption(author))]}
      </>
    )
  } 

  render() {
    return (
      <>
      {this.allAuthorOptions()}
      </>
    );
  }
}


var workService: WorkServiceInterface = new WorkRestService();
var authorService: AuthorServiceInterface = new AuthorRestService();

export default function WorkRegisterPage(){
  const [workTitle, setWorkTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date());
  const [author, setAuthor] = useState<AuthorDto>(defaultAuthor);
  const [authorId, setAuthorId] = useState(-1);
  const [genre, setGenre] = useState("");

  function authorBirthDate(author: AuthorDto) : Date{
    var dateString: string= author.birthDate.toString(); // Oct 23

    console.log(typeof author.birthDate)

    return parse(dateString, 'dd/MM/yyyy', new Date());
  }

  async function setAuthorByIndex(index: number){

    var authorValue : AuthorDto; 
    if(index === -1){
      authorValue = defaultAuthor();
      setAuthor(authorValue);
      setPublicationDate(authorValue.birthDate);
      setAuthorId(index);
      return;
    }
    authorValue = await authorService.findById(index) as AuthorDto;

    authorValue.birthDate = authorBirthDate(authorValue);

    var period = differenceInDays(publicationDate, authorValue.birthDate);

    if(period < 0){
      setPublicationDate(authorValue.birthDate);
    }
    setAuthor(authorValue);
    setAuthorId(index);
  }

  function checkField(fieldName : string, fieldValue : number){
    const fieldElement = document.getElementById(fieldName);
    if(fieldValue <= 0){
      fieldElement!.classList.add("is-invalid");
    }else{
      fieldElement!.classList.remove("is-invalid");
      fieldElement!.classList.add("is-valid");
    }
    return fieldValue > 0;
  }

  function isValidWork(){
    const cTitle = checkField("workTitle", workTitle.length);
    const cAuthor = checkField("author", authorId);
    const cGenre = checkField("genre", genre.length);
    
    return (cTitle && cAuthor && cGenre);
  }
  
  async function submitWork(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    if(!isValidWork()){
      return;
    }
    const work: WorkDto = {
      id: -1,
      title: workTitle,
      publicationDate: publicationDate,
      authorId: authorId,
      genre: genre
    }
    await workService.save(work);

    setWorkTitle("");
    setPublicationDate(new Date());
    setAuthorId(-1);
    setGenre("");
  }

  return  (
    <>
    <Navbar />
    <main className="form-center">
      <h3>Cadastro de Obra</h3>
      <form action="" onSubmit={(event) => submitWork(event)}>
        <fieldset>
          <FormGroup label="Nome da Obra" forModel="workTitle">
            <input className="form-control" type="text" name="workTitle" id="workTitle" placeholder="Nome da Obra"
              value={workTitle}
              onChange={(event) => { setWorkTitle(event.target.value); } } />
          </FormGroup>
          <FormGroup label="Autor" forModel="author">
            <select value={authorId} name="author" id="author" className="form-select"
              onChange={(event) => {
                setAuthorByIndex(Number(event.target.value));
              } }>
              <option value={-1}>Selecione um autor</option>
              <AuthorOptions/>
            </select>
          </FormGroup>
          <FormGroup label="Data de Publicação" forModel="publicationDate">
            <DatePicker
              id="publicationDate"
              selected={publicationDate}
              onChange={(date: Date) => setPublicationDate(date)}
              minDate={author.birthDate}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="form-control"
              dateFormat="dd/MM/yyyy" />
          </FormGroup>
          <FormGroup label="Gênero" forModel="genre">
            <input className="form-control" type="text" name="genre" id="genre" placeholder="Gênero"
              value={genre}
              onChange={(event) => { setGenre(event.target.value); } } />
          </FormGroup>
        </fieldset>
        <button className="btn btn-primary submit-btn" type="submit">Cadastrar</button>
      </form>
    </main>
    </>
  )
}
