import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password } = req.body;

    const newUser = await userService({ name, email, role, password });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    (console.error(error),
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: {},
      }));
  }
};

export const userController = {
  createUser,
};

// "id": 45,
// "title": "Database connection timeout under load",
// "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
// "type": "bug",
// "status": "open",
// "reporter_id": 1,
// "created_at": "2026-01-20T10:30:00Z",
// "updated_at": "2026-01-20T10:30:00Z"

// await pool.query(`
//   CREATE TABLE IF NOT EXISTS profiles(
//   id SERIAL PRIMARY KEY,
//   user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

//   bio TEXT,
//   address TEXT,
//   phone VARCHAR(15),
//   gender VARCHAR(10),

//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
//   )
//     `);
