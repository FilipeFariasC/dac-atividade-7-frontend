import axios from "axios";
import WorkModel from "../../../model/WorkDto";
import WorkServiceInterface from "../../interfaces/WorkServiceInterface";
import {format} from "date-fns"

export default class WorkRestService implements WorkServiceInterface{
  private readonly PREFIX : string = "http://localhost:8080/api/works/";

  async save ({title, authorId,publicationDate,genre}: WorkModel) : Promise<WorkModel>{
    var work : WorkModel = await axios.post(this.PREFIX,
      { 
        title, 
        authorId,
        publicationDate: format(publicationDate, 'dd/MM/yyyy'), 
        genre
      }
    ).then(function (response) {
      return response.data;
    }).catch(function (error) {
      throw new Error("Não foi possível criar obra"); 
    });
    return work;
  }
  async findById (id: number) : Promise<WorkModel>{
    var work : WorkModel = await axios.get(this.PREFIX + id.toString())
    .then(function (response) {
      return response.data;
    }).catch (function (error) {
      throw new Error(`Não foi possível buscar o autor de id {id}`);
    });
    return work;
  }
  async findAll () :Promise<WorkModel[]>{
    var work : WorkModel[] = await axios.get(this.PREFIX)
    .then(function (response) {
      return response.data as WorkModel[];
    });
    return work;
  }
  async update (id: number, {title, authorId,publicationDate,genre}: WorkModel) : Promise<WorkModel>{
    var work : WorkModel = await axios.put(this.PREFIX + id.toString(),
      {
        title, 
        authorId,
        publicationDate: format(publicationDate, 'dd/MM/yyyy'), 
        genre
      }
    ).then(function (response) {
      return response.data as WorkModel;
    }).catch(function (error) {
      throw new Error(`Não foi possível atualizar o autor de id {id}`);
    });
    return work;
  }
  async deleteById (id: number) : Promise<void>{
    await axios.delete(this.PREFIX + id.toString());
  }

}
