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
  )

  if (result.affectedRows === 0) {
    throw new ApiError(404, "User not found or cannot delete admin");
  }

  return {
    deletedUserId: userId
  };
};

export const getUserWithTaskService = async (params) => {
  const [rows] = await pool.query(`
    SELECT 
      u.id AS user_id,
      u.name,
      u.email,
      u.role,
      t.id AS task_id,
      t.title,
      t.description,
      t.created_at AS task_created_at
    FROM users u
    INNER JOIN tasks t
      ON u.id = t.user_id
    ORDER BY u.id;
  `)

  const usersMap = {}
  for (const row of rows) {
    if (!usersMap[row.user_id]) {
      usersMap[row.user_id] = {
        id: row.user_id,
        name: row.name,
        email: row.email,
        role: row.role,
        tasks: []
      }
    }

    if (row.task_id) {
      usersMap[row.user_id].tasks.push({
        id: row.task_id,
        title: row.title,
        description: row.description,
        created_at: row.task_created_at
      });
    }
  }

  return Object.values(usersMap);
}