import { AuthorModel } from "./AuthorRegister";

export interface BookModel {
  title: string;
  publicationDate: Date;
  author: AuthorModel;
}

export default function BookRegister(){
  return (
    <>
    </>
  )
}