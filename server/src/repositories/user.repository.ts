import { UserModel,UserDocument } from "../models/user.model";
import { UserInterface } from "../types/user.types";


export interface IUserRepository{
    create(userData:Partial<UserInterface>):Promise<UserDocument>;
    findUserByEmail(email:string):Promise<UserDocument|null>;
    findUserById(id:string):Promise<UserDocument|null>;
    update(id:string,updateData:Partial<UserInterface>):Promise<UserDocument|null>;
}

export class UserRepository implements IUserRepository{
    async create(userData:Partial<UserInterface>):Promise<UserDocument>{
        return await UserModel.create(userData);
    }

    async findUserByEmail(email:string):Promise<UserDocument|null>{
        return await UserModel.findOne({email});
    }


    async findUserById(id:string):Promise<UserDocument|null>{
        return await UserModel.findById(id)
    }

    async update(id:string,updateData:Partial<UserInterface>):Promise<UserDocument|null>{
        return await UserModel.findByIdAndUpdate(id,updateData,{new:true})
    }

}