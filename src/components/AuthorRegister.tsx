import {FormEvent, useState} from "react";
import FormGroup from "./FormGroup";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {subYears} from "date-fns";
import Navbar from "./Navbar";
import AuthorModel from "../model/AuthorModel"
interface AuthorRegisterProps{
  authorList: AuthorModel[];
}



export default function AuthorRegister ({authorList} : AuthorRegisterProps){
  const [authorName, setAuthorName] = useState("");
  var timestampZero = new Date(1970, 0, 0);
  var date : Date = subYears(new Date(), 18);

  const [birthDate, setBirthDate] = useState(date);

  const [birthPlace, setBirthPlace] = useState("");

  const [authorListChanged, setAuthorListChanged] = useState(false);


  function authorRow(author: AuthorModel, index:number) {
  return (
    <div key={index} className="register flex flex-col">
      <header className="flex">
        <h4>Autor {index}</h4>
        <button type="submit" className="btn btn-primary submit-btn"
        onClick={() => {
          authorList.splice(index, 1);
          setAuthorListChanged(true);
        }}
        > Excluir </button>
      </header>
      <p className="registerField">
        <p>Nome:</p> 
        {author.name}
      </p>
      <p className="registerField">
        <p>Data de Nascimento:</p>
        {author.birthDate.toLocaleDateString()}
      </p>
      <p className="registerField">
        <p>Nacionalidade:</p>
        {author.birthPlace}
      </p>
    </div>
  );
}

  function authorRegisterList() {
    return (
      <div className={"registerList " + (authorList.length > 0 ? "show" : "")}>
        {authorList.map((author, index) => authorRow(author, index))}
      </div>
    );
  }


  function submitAuthor(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    const authorNameElement = document.getElementById("name");
    var entrou: boolean = false;
    if(authorName.length === 0){
      authorNameElement?.classList.add("is-invalid");

      entrou= true;
    } else{
      authorNameElement?.classList.remove("is-invalid");
      authorNameElement?.classList.add("is-valid");
    }
    const authorBirthPlaceElement = document.getElementById("birthPlace");
    if(birthPlace.length === 0){
      authorBirthPlaceElement?.classList.add("is-invalid");
      entrou= true;
    } else{
      authorBirthPlaceElement?.classList.remove("is-invalid");
      authorBirthPlaceElement?.classList.add("is-valid");
    }
    if(entrou){
      return;
    }

    authorList.push({
      name: authorName,
      birthDate: birthDate,
      birthPlace: birthPlace
    });

    setAuthorListChanged(true);
  }

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="form-center">
        <h3>Cadastro de Autor</h3>
        <form action="" onSubmit={(event) => {submitAuthor(event)}}>
          <fieldset>
            <FormGroup label="Nome do Autor" forModel="name">
              <input className="form-control" type="text" name="name" id="name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Data de Nascimento" forModel="birthDate">
              <DatePicker
              id="birthDate"
              selected={birthDate}
              onChange={(date:Date) => setBirthDate(date)}
              locale="pt-BR"
              minDate={timestampZero}
              maxDate={date}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="form-control"
              dateFormat="dd/MM/yyyy"
              />
            </FormGroup>
            <FormGroup label="Nacionalidade" forModel="birthPlace">
              <input className="form-control" type="text" name="birthPlace" id="birthPlace"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              />
            </FormGroup>
          </fieldset>
          <button type="submit" className="btn btn-primary submit-btn">Submit</button>
        </form>
        <>
        {
          authorListChanged ? setAuthorListChanged(false) : authorRegisterList()
        }
        </>
      </main>
    </>
  );
}