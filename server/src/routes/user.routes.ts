import {Router} from 'express';
import { UserRepository } from '../repositories/user.repository';
import {UserService} from '../services/user.service'
import {UserController} from '../controllers/user.controller'

const router=Router();

const userRepository=new UserRepository();
const userService=new UserService(userRepository)
const userController=new UserController(userService);

router.post('/register',userController.register)

export default router