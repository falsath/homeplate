import {Schema,model,Document} from 'mongoose';
import { UserInterface } from '../types/user.types';

export interface UserDocument  extends Omit<UserInterface,'id'>,Document {} 

const userSchema=new Schema<UserDocument>({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,

    },
    role:{
        type:String,
        enum:['customer','homeCook','admin'],
        default:'customer',
    },
    isVerified:{
        type:Boolean,
        default:false,

    },
    otp:{
        code:{
            type:String,
        },
        expiresAt:{
            type:Date,
        }
    },
},
{
    timestamps:true,

},
    
)

export const UserModel=model('User',userSchema)