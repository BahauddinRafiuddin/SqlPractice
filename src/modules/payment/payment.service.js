import pool from "../../config/db.js"


export const makePaymentService = async (amount, taskData, userId) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const { title, description } = taskData
    if (!title || !amount) {
      throw new Error("Title and amount are required");
    }

    const [task] = await connection.query(`
       INSERT INTO tasks(title, description, user_id) values(?,?,?)`,
      [title, description, userId]
    )
    const [payment] = await connection.query(`
      INSERT INTO payments (user_id,amount) values (?,?)`,
      [userId, amount]
    )

    await connection.commit()
    return {
      PaymentId: payment.insertId,
      taskId: task.insertId,
      task: title
    }
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}