import Navbar from "../components/Navbar";
import {FormEvent, useEffect, useState} from "react";
import FormGroup from "../components/FormGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {subYears, parse} from "date-fns";
import AuthorDto from "../model/AuthorDto"
import AuthorServiceInterface from "../services/interfaces/AuthorServiceInterface";
import AuthorRestService from "../services/concrete/rest/AuthorRestService";
import { useParams, useNavigate } from "react-router-dom";

var authorService: AuthorServiceInterface = new AuthorRestService();

function minValidBirthDate(): Date{
    return subYears(new Date(), 18);
}
function authorBirthDate(author: AuthorDto) : Date{
  var dateString: string= author.birthDate.toString(); // Oct 23

  return parse(dateString, 'dd/MM/yyyy', new Date());
}

export default function AuthorUpdatePage (){
  const navigate = useNavigate();
  let {id} = useParams();
  const [userLoad, setUserLoad] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [birthDate, setBirthDate] = useState(minValidBirthDate());
  const [birthPlace, setBirthPlace] = useState("");

  useEffect(() => {
    if(!userLoad){
      const data = async ()=>{
        return await authorService.findById(Number(id))
      };
      data().then(author => {
        setAuthorName(author.name);
        setBirthDate(authorBirthDate(author));
        setBirthPlace(author.birthPlace);
        setUserLoad(true);
      });
    } 
  });
  
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
    await authorService.update(parseInt(id!), author);
    navigate("/listAuthors");
  }

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="form-center">
        <h3>Atualização de Autor</h3>
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
