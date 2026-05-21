import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserDB(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: result,
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

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateRefreshToken(
      req.cookies.refreshToken,
    );
    res.status(200).json({
      success: true,
      message: "Refresh Token Generated!!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  refreshToken,
};
