import { loginUser, registerUser, updateUserService } from "./auth.service.js";
import { ApiError } from "../../utils/ApiError.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    });

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
};


export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body)
    return res.status(200).json({
      success: true,
      message: "User Login successfully",
      data: result
    });
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

export const profile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: req.user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const result = await updateUserService(req.user.id, req.body)
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result
    });
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
