import { ApiError } from "../../utils/ApiError.js"
import { createTaskService, deleteTaskService, getMyTaskService, updateTaskService } from "./task.service.js"

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await createTaskService(req.body, userId)

    return res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      result
    })
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    // Unexpected errors
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export const getMyTask = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await getMyTaskService(userId)
    return res.status(200).json({
      success: true,
      message: "Tasks Found Successfully",
      result
    })
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    // Unexpected errors
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params
    const result = await updateTaskService(req.body, taskId)
    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      result
    })
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    // Unexpected errors
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export const deleteTask=async (req,res) => {
  try {
    const {taskId}=req.params
    const result=await deleteTaskService(taskId)

    return res.status(200).json({
      success:true,
      message:"Task Deleted Successfully",
      result
    })
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    // Unexpected errors
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}