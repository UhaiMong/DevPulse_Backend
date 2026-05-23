import { pool } from "../../config/db";
import type { IUser } from "./user.interface";

const createUserQuery = async (
  payload: Omit<IUser, "id" | "created_at" | "updated_at">,
) => {
  const { name, email, password, role } = payload;
  const sql = `
    INSERT INTO users(name, email, password, role)
    VALUES($1,$2,$3,$4)
    RETURNING id, name, email, role, created_at, updated_at
    `;
  try {
    const result = await pool.query(sql, [name, email, password, role]);
    return result.rows[0];
  } catch (error) {
    if ((error as any).code === "23505") {
      throw new Error("EMAIL_EXISTS");
    }
    throw error;
  }
};

const getSingleUserById = async (id: number) => {
  const sql = `
SELECT id, name, role FROM users
WHERE id = $1
`;
  const result = await pool.query(sql, [id]);
  return result.rows[0];
};

export const userQueries = {
  createUserQuery,
  getSingleUserById,
};
