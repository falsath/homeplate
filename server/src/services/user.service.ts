import bcrypt from 'bcryptjs'
import {IUserRepository} from '../repositories/user.repository';
import {RegisterUserDto,RegisterResponseDto} from '../types/user.types'

export interface IUserService{
   
    registerUser(dto:RegisterUserDto):Promise<RegisterResponseDto>;

}    

export class UserService implements IUserService {

    private userRepo:IUserRepository;

    constructor(userRepo:IUserRepository){
        this.userRepo=userRepo
    }  
    
    
     async registerUser(dto:RegisterUserDto):Promise<RegisterResponseDto>{
        const {name,email,password,phone,role}=dto;

        const  userExist=await this.userRepo.findUserByEmail(email)
        if(userExist){
            throw new Error("This email is already registered")
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const otpCode=Math.floor(100000+Math.random()*900000).toString()
        const expireAt=new Date(Date.now()+5*60*1000);

        console.log(`otp code is: ${otpCode}`)

        const newUser=await this.userRepo.create({
            name,
            email,
            phone,
            password:hashedPassword,
            role:role||"customer",
            isVerified:false,
            otp:{
                code:otpCode,
                expiresAt:expireAt,
            },
        })

    return {
        id:newUser._id.toString(),
        name:newUser.name,
        email:newUser.email,
    };

    }


    
}

   