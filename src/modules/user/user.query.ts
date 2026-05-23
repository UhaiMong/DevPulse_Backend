import { pool } from "../../config/db";
import type { IUser } from "./user.interface";

export const createUserQuery = async (
  payload: Omit<IUser, "id" | "created_at" | "updated_at">,
) => {
  const { name, email, password, role } = payload;
  const sql = `
    INSERT INTO users(name, email, password, role)
    VALUES($1,$2,$3,$4)
    RETURNING id, name, email, role, created_at, updated_at
    `;

  const result = await pool.query(sql, [name, email, password, role]);
  return result.rows[0];
};

// id: number | string;
// title: string;
// description: string;
// type: string;
// status: string;
// reporter_id: number | string;
// created_at: Date;
// updated_at: Date;
