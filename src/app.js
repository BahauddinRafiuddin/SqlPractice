import express from 'express'
import cors from 'cors'
import authRouter from './modules/auth/auth.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'
import userRouter from './modules/user/user.routes.js'

const app=express()

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.use(errorHandler)
export default app