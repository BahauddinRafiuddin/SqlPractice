import pool from "../../config/db.js"
import { ApiError } from "../../utils/ApiError.js"

export const getAllUserService = async (currentUserId, page) => {
  const limit = 10
  const offset = (page - 1) * limit
  const [rows] = await pool.query(
    `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id != ?
    LIMIT ? OFFSET ?
    `,
    [currentUserId, limit, offset]
  )
  if (rows.length === 0) {
    throw new ApiError(404, "No User Found")

  }

  const [countResult] = await pool.query(
    `
    SELECT COUNT(*) as total
    FROM users
    WHERE id != ?
    `,
    [currentUserId]
  )
  return {
    currentPage: page,
    totalUsers: countResult[0].total,
    totalPages: Math.ceil(countResult[0].total / limit),
    users: rows
  }
}

export const deleteUserService = async (userId) => {
  const [result] = await pool.query(
    `DELETE FROM users WHERE id = ? AND role = ?`,
    [userId, 'user']
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "User not found or cannot delete admin");
  }

  return {
    deletedUserId: userId
  };
};
