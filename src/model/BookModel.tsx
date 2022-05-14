import AuthorModel  from "../model/AuthorModel";

export default interface BookModel {
  title: string;
  author: AuthorModel;
  publicationDate: Date;
  genre: string;
}