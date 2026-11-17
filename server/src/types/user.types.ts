export type UserRole='customer'|'homeCook'|'admin';

export enum HttpStatus{
    OK=200,
    CREATED=201,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    NOT_FOUND=404,
    INTERNAL_SERVER_ERROR=500,
}

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

export interface  RegisterUserDto{
    name:string;
    email:string;
    password:string;
    phone:string;
    role?:UserRole;
}

export interface RegisterResponseDto{
    id:string;
    name:string;
    email:string;
}

export interface ApiResponse<T>{
    success:boolean;
    message:string;
    data?:T;
    error?:unknown;

}