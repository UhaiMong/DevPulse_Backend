import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { envConfig } from "../../config/env";
import { pool } from "../../config/db";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const decodedUser = jwt.verify(
      token as string,
      envConfig.jwt_secret_token as string,
    ) as JwtPayload;
    const existingUser = await pool.query(
      `
        SELECT * FROM users WHERE email = $1
        `,
      [decodedUser.email],
    );
    const user = existingUser.rows[0];

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default auth;
