import bcrypt from 'bcryptjs'
import {UserRepository} from '../repositories/user.repository';

export class UserService{
    private userRepo:UserRepository;

    constructor(){
        this.userRepo=new UserRepository()
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
            isVarified:false,
            otp:{
                code:otpCode,
                expireAt,
            },
        })

    return newUser;

    }

}