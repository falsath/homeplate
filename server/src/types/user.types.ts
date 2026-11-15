export type UserRole='customer'|'homeCook'|'admin';

export interface UserInterface{
    id?:string;
    name:string;
    email:string;
    password:string;
    phone:string;
    role:UserRole;
    isVerified:boolean;
    otp?:{
        code:string;
        expiresAt:Date;
    }
}