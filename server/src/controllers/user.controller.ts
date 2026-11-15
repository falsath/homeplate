import {Request,Response} from 'express'
import {UserService} from '../services/user.service'

export class UserController{
    private userService:UserService;

    constructor(){
        this.userService=new UserService()
    }

    register=async (req:Request,res:Response):Promise<void>=>{

        try{
            const userData=req.body
            const newUser=await this.userService.registerUser(userData);

            res.status(201).json({
                success:true,
                message:"Registration is successful,please verify the otp sent to your email",
                data:{
                    id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                },

            });

        }catch(error:any){
            res.status(400).json({
                success:false,
                message:error.message,
            })
            
        }

    }

}