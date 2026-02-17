import pool from "../../config/db.js"
import { ApiError } from "../../utils/ApiError.js"

export const createTaskService = async (taskData, user_id) => {
  const { title, description } = taskData
  const [rows] = await pool.query(
    `INSERT INTO tasks (title , description ,user_id ) values (?,?,?)`,
    [title, description, user_id]
  )
  return {
    id: rows.insertId,
    title
  }
}

export const getMyTaskService = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT * from tasks where user_id = ?`, [user_id]
  )
  if (rows.length === 0) {
    throw new ApiError(404, "No Task Found")
  }

  return {
    totalTask: rows.length,
    rows
  }
}

export const updateTaskService = async (updateTaskData, taskId) => {
  const { title, description } = updateTaskData
  if (!title && !description) {
    throw new ApiError(400, "At least one field is required to update");
  }
  let fields = []
  let values = []

  if (title) {
    fields.push('title = ?')
    values.push(title)
  }

  if (description) {
    fields.push('description = ?')
    values.push(description)
  }

  values.push(taskId)
  const query = `UPDATE tasks set ${fields.join(", ")} where id = ?`
  const [result] = await pool.query(
    query,
    values
  )

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Task not found");
  }

  return {
    id: taskId,
    title: title || undefined
  }
}

export const deleteTaskService=async (taskId) => {
  const [result]=await pool.query(
    `delete from tasks where id= ?`,[taskId]
  )

  if(result.affectedRows === 0){
    throw new ApiError(404,"task not found !!")
  }
  return{
    taskId:taskId
  }
}