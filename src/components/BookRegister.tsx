import {FormEvent, useState} from "react";
import { AuthorModel } from "./AuthorRegister";
import FormGroup from './FormGroup';
import DatePicker from "react-datepicker";

interface BookRegisterProps{
  bookList: BookModel[];
  authorList: AuthorModel[];
  userListChanged: [boolean, (value: boolean) => void];
}

export interface BookModel {
  title: string;
  publicationDate: Date;
  author: AuthorModel;
  genre: string;
}
const defaultAuthor: AuthorModel = {
    name: "",
    birthDate: new Date(),
    birthPlace: ""
  }


export default function BookRegister(props: BookRegisterProps){
  const [bookTitle, setBookTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date());
  const [author, setAuthor] = useState<AuthorModel>(defaultAuthor);
  const [index, setIndex] = useState(-1);
  const [genre, setGenre] = useState("");

  const [listChanged, setListChanged] = useState(false);

  function updateBookList(){
    var list = props.bookList;
    for(var i:number = 0; i < list.length; i++){
      var book = list[i];
      if(!props.authorList.includes(book.author)){
        list.splice(i, 1);
        i--;
        setListChanged(true);
      }
    }
  }

  function bookRow(book: BookModel, index:number, setListChanged: (value: boolean) => void) {
  return (
    <div key={index} className="register flex flex-col">
      <header className="flex">
        <h4>Livro {index}</h4>
        <button className="btn btn-primary"
        onClick={() => {
          props.bookList.splice(index, 1);
          setListChanged(true);
        }}>
        Excluir
        </button>
      </header>
      <p className="registerField">
        <p>Título:</p> 
        {book.title}
      </p>
      <p className="registerField">
        <p>Autor:</p> 
        {book.author.name}
      </p>
      <p className="registerField">
        <p>Data de Publicação:</p>
        <span className="dia">{book.publicationDate.getDate()}</span>
        /
        <span className="mes">{book.publicationDate.getMonth()}</span>
        /
        <span className="ano">{book.publicationDate.getFullYear()}</span>
      </p>
      <p className="registerField">
        <p>Gênero:</p>
        {book.genre}
      </p>
    </div>
  );
}


  function bookRegisterList(bookList: BookModel[]) {
  return (
    <div className={"registerList " + (bookList.length > 0 ? "show" : "")}>
      {bookList.map((book, index) => bookRow(book, index, setListChanged))}
    </div>
  );
}

  function authorOptions(){
    return (
      <>
        {props.authorList.map((authorElement, index) => <option key={index} value={index}>{authorElement.name}</option>)}
      </>
    )
  }

  function setAuthorByIndex(index: number){
    console.log(index)
    if(index === -1){
      setIndex(index);
      setAuthor(defaultAuthor);
      return;
    }
    setIndex(index);
    setAuthor(props.authorList[index]);
  }
  function submitBook(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    const bookTitleElement = document.getElementById("bookTitle");
    var entrou: boolean = false;
    if(bookTitle.length === 0){
      bookTitleElement?.classList.add("error");

      entrou= true;
    } else{
      bookTitleElement?.classList.remove("error");
    }
    const authorElement = document.getElementById("author");
    if(author.name == defaultAuthor.name){
      authorElement?.classList.add("error");
      entrou= true;
    } else{
      authorElement?.classList.remove("error");
    }
    const genreElement = document.getElementById("genre");
    if(genre.length === 0){
      genreElement?.classList.add("error");
      entrou= true;
    } else{
      genreElement?.classList.remove("error");
    }


    if(entrou){
      return;
    }

    props.bookList.push({
      title: bookTitle,
      publicationDate: publicationDate,
      author: author,
      genre: genre
    });

    setListChanged(true);
  }

  return (
    <>
    <h3>Cadastro de Obra</h3>
    <form action="" onSubmit={(event)=>submitBook(event)}>
      <fieldset>
        <FormGroup label="Nome da Obra" forModel="bookTitle">
          <input className="form-control" type="text" name="bookTitle" id="bookTitle" placeholder="Nome da Obra" 
          value={bookTitle}
          onChange={(event) =>{setBookTitle(event.target.value)}}/>
        </FormGroup>
        <FormGroup label="Autor" forModel="author" >
          <select value={index} name="author" id="author" className="form-select" 
            onChange={(event) =>{
            setAuthorByIndex(Number(event.target.value))
            }
          }>
            <option value={-1}> Selecione um autor </option>
            {authorOptions()}

          </select>

        </FormGroup>
        <FormGroup label="Data de Publicação" forModel="publicationDate">
            <DatePicker 
            id="publicationDate"
            selected={publicationDate}
            onChange={(date:Date) => setPublicationDate(date)}
            minDate={author.birthDate}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="form-control"
            dateFormat="dd/MM/yyyy"
            />
        </FormGroup>
        <FormGroup label="Gênero" forModel="genre">
          <input className="form-control" type="text" name="genre" id="genre" placeholder="Gênero" 
          value={genre}
          onChange={(event) =>{setGenre(event.target.value)}}/>
        </FormGroup>
      </fieldset>
      <button className="btn btn-primary submit-btn" type="submit"  >Cadastrar</button>
    </form>
    {props.userListChanged ? updateBookList() : null};
    {listChanged ? setListChanged(false) : bookRegisterList(props.bookList)}
    </>
  )
}