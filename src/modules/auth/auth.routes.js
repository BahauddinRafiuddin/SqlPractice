import express from 'express'
import { login, profile, register, updateUser } from './auth.controller.js'
import protect from '../../middlewares/auth.middleware.js'

const authRouter=express.Router()

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/profile',protect,profile)
authRouter.put('/update',protect,updateUser)

export default authRouter