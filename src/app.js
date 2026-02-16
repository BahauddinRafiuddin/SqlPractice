import express from 'express'
import cors from 'cors'
import authRouter from './modules/auth/auth.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app=express()

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)



app.use(errorHandler)
export default app