import 'dotenv/config';

import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log("Database connected successfully");
//     connection.release();

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//   }
// };

// startServer();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});