import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import { envConfig } from "../../config/env";

const JWT_SECRET = envConfig.jwt_secret_token;
const JWT_REFRESH = envConfig.jwt_refresh_token;

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
  const accessToken = jwt.sign(jwtPayload, JWT_SECRET as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtPayload, JWT_REFRESH as string, {
    expiresIn: "10d",
  });

  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unuthorized access!");
  }
  const decodedData = jwt.verify(
    token as string,
    JWT_REFRESH as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [decodedData.email],
  );
  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User Not Found!");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return { accessToken };
};

export const authService = {
  loginUserDB,
  generateRefreshToken,
};
