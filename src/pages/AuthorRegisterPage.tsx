import {FormEvent, useState} from "react";
import FormGroup from "../components/FormGroup";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {subYears} from "date-fns";
import Navbar from "../components/Navbar";
import AuthorDto from "../model/AuthorDto"
import AuthorServiceInterface from "../services/interfaces/AuthorServiceInterface";
import AuthorRestService from "../services/concrete/rest/AuthorRestService";

var authorService: AuthorServiceInterface = new AuthorRestService();

function minValidBirthDate(){
    return subYears(new Date(), 18);
}

export default function AuthorRegisterPage (){
  const [id, setId] = useState(-1);
  const [authorName, setAuthorName] = useState("");
  const [birthDate, setBirthDate] = useState(minValidBirthDate());
  const [birthPlace, setBirthPlace] = useState("");

  function checkField(fieldName : string, fieldValue : string){
    const fieldElement = document.getElementById(fieldName);
    if(fieldValue.length === 0){
      fieldElement!.classList.add("is-invalid");
    }else{
      fieldElement!.classList.remove("is-invalid");
      fieldElement!.classList.add("is-valid");
    }
    return fieldValue.length !== 0;
  }

  function isValidAuthor(){
    const cName = checkField("name", authorName);
    const cBirthPlace = checkField("birthPlace", birthPlace);
  
    return (cName && cBirthPlace);
  }

  async function submitAuthor(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    if(!isValidAuthor()){
      return;
    }
    var author: AuthorDto=
      {
        name: authorName, 
        birthDate,
        birthPlace
    };
    
    await authorService.save(author);

    setAuthorName("");
    setBirthDate(minValidBirthDate());
    setBirthPlace("");
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
              maxDate={minValidBirthDate()}
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
      </main>
    </>
  );
}
