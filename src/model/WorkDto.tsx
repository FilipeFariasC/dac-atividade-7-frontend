import AuthorDto  from "./AuthorDto";

export default interface WorkDto {
  id?: number;
  title: string;
  authorId: number;
  publicationDate: Date;
  genre: string;
}
