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
