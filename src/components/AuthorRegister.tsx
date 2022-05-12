import {FormEvent, useState} from "react";
import FormGroup from "./FormGroup";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {subYears, subDays, addDays} from "date-fns";

export interface AuthorModel {
  name: string;
  birthDate: Date;
  birthPlace: string;
}
interface AuthorRegisterProps{
  authorList: AuthorModel[];
}

function authorRow(author: AuthorModel, index:number) {
  return (
    <div key={index} className="register flex flex-col">
      <h4>User {index}</h4>
      <p>{author.name}</p>
      <p>
        <span className="dia">{author.birthDate.getDate()}</span>
      </p>
      <p>{author.birthPlace}</p>
    </div>
  );
}

function authorRegisterList(authorList: AuthorModel[]) {
  return (
    <div className={"registerList " + (authorList.length > 0 ? "show" : "")}>
      {authorList.map((author, index) => authorRow(author, index))}
    </div>
  );
}

export default function AuthorRegister ({authorList} : AuthorRegisterProps){
  const [authorName, setAuthorName] = useState("");
  var timestampZero = new Date(1970, 0, 0);
  var date : Date = subYears(new Date(), 18);

  const [birthDate, setBirthDate] = useState(date);

  const [birthPlace, setBirthPlace] = useState("");


  const [authorCreated, setAuthorCreated] = useState(false);


  function submitAuthor(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    const authorNameElement = document.getElementById("name");
    var entrou: boolean = false;
    if(authorName.length === 0){
      authorNameElement?.classList.add("error");

      entrou= true;
    } else{
      authorNameElement?.classList.remove("error");
    }
    const authorBirthPlaceElement = document.getElementById("birthPlace");
    if(birthPlace.length === 0){
      authorBirthPlaceElement?.classList.add("error");
      entrou= true;
    } else{
      authorBirthPlaceElement?.classList.remove("error");
    }
    if(entrou){
      return;
    }

    authorList.push({
      name: authorName,
      birthDate: birthDate,
      birthPlace: birthPlace
    });

    setAuthorCreated(true);
  }

  return (
    <>
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
      {authorCreated ? setAuthorCreated(false) : authorRegisterList(authorList)}
    </>
  )
}