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
    if ((error as any).message === "This email is already registered") {
      res.status(400).json({ success: false, message: (error as any).message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

export const userController = {
  createUser,
};
