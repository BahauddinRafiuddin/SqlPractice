import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import { authorize } from '../../middlewares/role.middleware.js';
import { getAllUsers } from './user.controller.js';
const userRouter=express.Router()
userRouter.get('/',protect,authorize('admin'),getAllUsers)
export default userRouter