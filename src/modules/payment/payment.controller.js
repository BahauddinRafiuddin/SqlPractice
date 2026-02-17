import { makePaymentService } from "./payment.service.js"

export const makePayment = async (req, res) => {
  try {
    const userId = req.user.id
    const { amount } = req.body

    const result = await makePaymentService(amount, req.body, userId)
    return res.status(201).json({
      success: true,
      message: "Payment is done and task is added",
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