import bcrypt from 'bcryptjs'
import {IUserRepository} from '../repositories/user.repository';

export interface IUserService{
   
    registerUser(userData:any):Promise<any>;

}    

export class UserService implements IUserService {

    private userRepo:IUserRepository;

    constructor(userRepo:IUserRepository){
        this.userRepo=userRepo
    }  
    
    
     async registerUser(userData:any){
        const {name,email,password,phone,role}=userData;

        const  userExist=await this.userRepo.findUserByEmail(email)
        if(userExist){
            throw new Error("This email is already exist")
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

    return newUser;

    }


    
}

   