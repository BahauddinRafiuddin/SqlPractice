import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import { makePayment } from './payment.controller.js'
import { authorize } from '../../middlewares/role.middleware.js'

const paymentRouter = express.Router()

paymentRouter.post('/', protect, authorize('user'), makePayment)
export default paymentRouter