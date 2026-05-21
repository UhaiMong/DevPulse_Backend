import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUserDB({ email, password });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error?.message}`,
      error: error,
      data: {},
    });
  }
};

export const authController = {
  loginUser,
};
