import AuthorModel from "../model/AuthorModel";


export default interface AuthorServiceInterface {
    create: (user: AuthorModel)=>AuthorModel;
    read: (id: number)=>AuthorModel;
    update: (id: number, user: AuthorModel) => AuthorModel;
    delete: (id: number) => void;
}