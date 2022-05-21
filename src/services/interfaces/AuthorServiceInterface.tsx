import AuthorModel from "../../model/AuthorDto";


export default interface AuthorServiceInterface {
    save: (user: AuthorModel)=>Promise<AuthorModel> ;
    findById: (id: number)=>Promise<AuthorModel> ;
    findAll: ()=> Promise<AuthorModel[]>;
    update: (id: number, user: AuthorModel) => Promise<AuthorModel> ;
    deleteById: (id: number) => Promise<void>;
}
