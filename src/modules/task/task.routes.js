import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import { authorize } from '../../middlewares/role.middleware.js'
import { createTask, deleteTask, getMyTask, updateTask } from './task.controller.js'

const taskRouter=express.Router()

taskRouter.post('/',protect,authorize('user'),createTask)
taskRouter.get('/',protect,authorize('user'),getMyTask)
taskRouter.put('/:taskId',protect,authorize('user'),updateTask)
taskRouter.delete('/:taskId',protect,authorize('user'),deleteTask)
export default taskRouter