import BookModel from "../model/BookModel";


export default interface BookServiceInterface {
    create: (user: BookModel)=>BookModel;
    read: (id: number)=>BookModel;
    update: (id: number, user: BookModel) => BookModel;
    delete: (id: number) => void;
}