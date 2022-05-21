import AuthorDto from "../../../model/AuthorDto";
import AuthorServiceInterface from "../../interfaces/AuthorServiceInterface";
import axios from "axios";
import {format} from 'date-fns'


export default class AuthorRestService implements AuthorServiceInterface{
  private readonly PREFIX : string = "http://localhost:8080/api/authors/";

  async save ({name, birthDate, birthPlace} : AuthorDto) : Promise<AuthorDto>{
    var created = await axios.post(this.PREFIX,
      {
        name,
        birthDate: format(birthDate, 'dd/MM/yyyy'),
        birthPlace
      }
    ).then(function (response) {
      return response.data as AuthorDto;
    }).catch(function (error) {
      console.log(error);
      throw new Error("Não foi possível criar autor");
    });
    return created as AuthorDto;
  }
  async findById (id: number) : Promise<AuthorDto>  {
    var created = await axios.get(this.PREFIX + id.toString())
    .then(function (response) {
      return response.data as AuthorDto;
    }).catch(function (error) {
      throw new Error(`Não foi possível encontrar o autor de id {id}!`);
    });
    return created as AuthorDto;
  }
  async findAll () : Promise<AuthorDto[]> {
    var authors: AuthorDto[] = await axios.get(this.PREFIX)
    .then(function (response) {
      return response.data as AuthorDto[];
    });
    return authors as AuthorDto[];
  }

  async update (id: number, {name, birthDate, birthPlace} : AuthorDto) : Promise<AuthorDto> {
    var author: AuthorDto =await axios.put(this.PREFIX + id.toString(),
      {
        name, 
        birthDate: format(birthDate, 'dd/MM/yyyy'), 
        birthPlace
      }
    ).then(function (response) {
      return response.data as AuthorDto;
    }).catch(function (error) {
      throw new Error(`Não foi possível atualizar o autor de identificador {id}`);
    });
    return author as AuthorDto;
  }

  async deleteById (id: number) : Promise<void> {
    await axios.delete(this.PREFIX + id.toString())
    .catch(function (error) {
      throw new Error(`Não foi possível deletar o autor de identificador {id}`);
    });
  }

}
