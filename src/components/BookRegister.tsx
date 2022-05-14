import {FormEvent, useState} from "react";
import AuthorModel  from "../model/AuthorModel";
import FormGroup from './FormGroup';
import DatePicker from "react-datepicker";
import Navbar from "./Navbar";
import BookModel from "../model/BookModel";
import {differenceInDays} from "date-fns";

interface BookRegisterProps{
  bookList: BookModel[];
  authorList: AuthorModel[];
  userListChanged: [boolean, (value: boolean) => void];
}

function defaultAuthor() : AuthorModel{
  return {
    name: "",
    birthDate: new Date(),
    birthPlace: ""
  }
}

export default function BookRegister(props: BookRegisterProps){
  const [bookTitle, setBookTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date());
  const [author, setAuthor] = useState<AuthorModel>(defaultAuthor);

  const [authorIndex, setAuthorIndex] = useState(-1);
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

  function bookRow(book: BookModel, index:number) {
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
      {bookList.map((book, index) => bookRow(book, index))}
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

    var authorValue; 
    if(index === -1){
      authorValue = defaultAuthor();
      setAuthorIndex(index);
      setAuthor(authorValue);
      setPublicationDate(authorValue.birthDate);
      return;
    }
    authorValue= props.authorList[index];

    var period = differenceInDays(publicationDate, authorValue.birthDate);

    if(period < 0){
      setPublicationDate(authorValue.birthDate);
    }

    setAuthorIndex(index);
    setAuthor(authorValue);

    
  }
  function isValidBook(){
    var entrou: boolean = false;
    const bookTitleElement = document.getElementById("bookTitle");
    if(bookTitle.length === 0){
      bookTitleElement?.classList.add("is-invalid");

      entrou= true;
    } else{
      bookTitleElement?.classList.remove("is-invalid");
      bookTitleElement?.classList.add("is-valid");
    }
    const authorElement = document.getElementById("author");
    if(author.name === defaultAuthor.name){
      authorElement?.classList.add("is-invalid");
      entrou = true;
    } else{
      authorElement?.classList.remove("is-invalid");
      authorElement?.classList.add("is-valid");
    }
    const genreElement = document.getElementById("genre");
    if(genre.length === 0){
      genreElement?.classList.add("is-invalid");
      entrou= true;
    } else{
      genreElement?.classList.remove("is-invalid");
      genreElement?.classList.add("is-valid");
    }
    return !entrou;
  }
  
  function submitBook(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    if(!isValidBook()){
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
    <Navbar />
    <main className="form-center">
      <h3>Cadastro de Obra</h3>
      <form action="" onSubmit={(event) => submitBook(event)}>
        <fieldset>
          <FormGroup label="Nome da Obra" forModel="bookTitle">
            <input className="form-control" type="text" name="bookTitle" id="bookTitle" placeholder="Nome da Obra"
              value={bookTitle}
              onChange={(event) => { setBookTitle(event.target.value); } } />
          </FormGroup>
          <FormGroup label="Autor" forModel="author">
            <select value={authorIndex} name="author" id="author" className="form-select"
              onChange={(event) => {
                setAuthorByIndex(Number(event.target.value));
              } }>
              <option value={-1}> Selecione um autor </option>
              {authorOptions()}
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
      <>
      {props.userListChanged ? updateBookList() : null}
      {listChanged ? setListChanged(false) : bookRegisterList(props.bookList)}
      </>
    </main>
    </>
  )
}