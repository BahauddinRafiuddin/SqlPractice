import pool from "../../config/db.js";
import { ApiError } from '../../utils/ApiError.js'
import bcrypt from 'bcrypt'
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exist
  const [existingUser] = await pool.query('SELECT id from users where email = ?', [email])
  if (existingUser.length > 0) {
    throw new ApiError(409, "Email already registered");
  }

  const hashPass = await bcrypt.hash(password, 10)

  const [result] = await pool.query('INSERT INTO users (name,email,password) values (?,?,?)', [name, email, hashPass])

  return {
    id: result.insertId,
    name,
    email
  }
}

export const loginUser = async (userData) => {
  const { email, password } = userData
  if (!email || !password) {
    throw new ApiError(400, "All field Is Required!")
  }

  // Check User Exist OR Not
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )
  if (rows.length === 0) {
    throw new ApiError(401, "Invalid credentials");
  }
  const user = rows[0];
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken({ id: user.id, role: user.role })

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
}

export const updateUserService = async (userId,userData) => {
  const { name, password } = userData
  if (!name && !password) {
    throw new ApiError(400, "At least one field is required to update");
  }
  let fields = []
  let values = []

  if (name) {
    fields.push("name = ?")
    values.push(name)
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    fields.push("password = ?");
    values.push(hashedPassword);
  }

  values.push(userId)

  const query = `update users set ${fields.join(", ")} where id = ?`
  const [result] = await pool.query(query, values)
  if (result.affectedRows === 0) {
    throw new ApiError(404, "User not found");
  }

  return {
    id: userId,
    name: name || undefined
  }
}