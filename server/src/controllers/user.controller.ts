import {Request,Response} from 'express'
import {IUserService} from '../services/user.service'
import { RegisterUserDto,RegisterResponseDto,ApiResponse,HttpStatus } from '../types/user.types';



export class UserController{
    private userService:IUserService;

    constructor(userService:IUserService){
        this.userService= userService;
    }

    register=async (req:Request<{},{},RegisterUserDto>,res:Response<ApiResponse<RegisterResponseDto>>):Promise<void>=>{

        try{
            const userData:RegisterUserDto=req.body
            const registeredUser=await this.userService.registerUser(userData);

            res.status(HttpStatus.CREATED).json({
                success:true,
                message:"Registration is successful,please verify the otp sent to your email",
                data: registeredUser,               
                
            });

        }catch(error:unknown){

            const errorMessage=error instanceof Error?error.message:"An unexpected error occured"

             

            res.status(HttpStatus.BAD_REQUEST).json({
                success:false,
                message:errorMessage,
            })
            
        }

    }

}