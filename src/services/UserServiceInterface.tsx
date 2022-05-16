import UserModel from "../model/UserModel";


export default interface UserServiceInterface {
    create: (user: UserModel)=>UserModel;
    read: (id: number)=>UserModel;
    update: (id: number, user: UserModel) => UserModel;
    delete: (id: number) => void;
}