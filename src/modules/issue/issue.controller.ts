import type { Request, Response } from "express";
import { issueServices } from "./issue.service";

// Create issue controller
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
// Get all issues controller

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueServices.getAllIssues({
      type: req.query.type as string,
      status: req.query.status as string,
      sort: req.query.sort as string,
    });
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "Your searched issues is not FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Issue retrieved successfullly",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
      data: {},
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
};
