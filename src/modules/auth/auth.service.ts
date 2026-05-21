import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import { envConfig } from "../../config/env";

const JWT_SECRET = envConfig.jwt_secret_token;

const loginUserDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  // Check existing user

  const existingUser = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );
  if (existingUser.rows.length === 0) {
    throw new Error("This user doesn't exist!");
  }

  const user = existingUser.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalide credential!");
  }

  //   token generation
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };
  const token = jwt.sign(jwtPayload, JWT_SECRET as string, {
    expiresIn: "1d",
  });
  if (!token) {
    throw new Error("Forbiden Access");
  }
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const authService = {
  loginUserDB,
};
