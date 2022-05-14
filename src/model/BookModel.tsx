import AuthorModel  from "../model/AuthorModel";

export default interface BookModel {
  title: string;
  publicationDate: Date;
  author: AuthorModel;
  genre: string;
}