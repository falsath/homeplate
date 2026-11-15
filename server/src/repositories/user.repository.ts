import { UserModel,UserDocument } from "../models/user.model";
import { UserInterface } from "../types/user.types";


export interface IUserRepository{
    create(userData:any):Promise<UserDocument>;
    findUserByEmail(email:string):Promise<UserDocument|null>;
    findUserById(id:string):Promise<UserDocument|null>;
    update(id:string,updateData:Partial<UserInterface>):Promise<UserDocument|null>;
}

export class UserRepository implements IUserRepository{
    async create(userData:any){
        return await UserModel.create(userData);
    }

    async findUserByEmail(email:string){
        return await UserModel.findOne({email});
    }


    async findUserById(id:string){
        return await UserModel.findById(id)
    }

    async update(id:string,updateData:any){
        return await UserModel.findByIdAndUpdate(id,updateData,{new:true})
    }

}