import type { Request, Response } from "express";
import { issueServices } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = req.user;
    const newIssue = await issueServices.createIssue(payload, user);

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: newIssue,
    });
  } catch (error: any) {
    (console.error(error),
      res.status(403).json({
        success: false,
        message: error.message || "Forbidden acces",
        data: {},
      }));
  }
};

export const issueController = {
  createIssue,
};
