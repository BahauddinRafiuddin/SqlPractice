import { ApiError } from "../../utils/ApiError.js";
import { getAllUserService } from "./user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await getAllUserService(req.user.id,page)
    return res.status(200).json({
      success: true,
      message: "All User Found Successfully",
      data: result
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
    });
  }
}