import { pool } from "../../config/db";
import type { IUser } from "../user/user.interface";

export const loginUserQuery = async (payload: Pick<IUser, "email">) => {
  const { email } = payload;
  const sql = `
    SELECT * FROM users WHERE email = $1
`;
  const result = await pool.query(sql, [email]);
  return result.rows[0];
};
