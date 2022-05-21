import WorkModel from "../../model/WorkDto";


export default interface WorkServiceInterface {
    save: (work: WorkModel)=>Promise<WorkModel> ;
    findById: (id: number)=>Promise<WorkModel> ;
    findAll: ()=> Promise<WorkModel[]>;
    update: (id: number, work: WorkModel) => Promise<WorkModel> ;
    deleteById: (id: number) => Promise<void>;
}
