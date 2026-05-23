import type { Request, Response } from "express";
import { issueServices } from "./issue.service";
import { userQueries } from "../user/user.query";

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
// Get single issue by id
const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueServices.getSingleIssue(Number(req.params.id));

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve issue",
      error: error.message,
    });
  }
};

// Get update issue by id: only contributor and maintainer

const updateIssue = async (req: Request, res: Response) => {
  try {
    const issueId = parseInt(req.params.id as any, 10);
    const user = {
      id: req.user.id,
      role: req.user.role,
    };
    // payload from request body
    const payload = {
      title: req.body.title as string,
      description: req.body.description as string,
      type: req.body.type as string,
      status: req.body.status as string,
    };

    const updatedIssue = await issueServices.updateIssue(
      payload,
      issueId,
      user,
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update issue",
      error: error.message,
    });
  }
};

// issue delete

const deleteIssueById = async (req: Request, res: Response) => {
  try {
    const issueId = parseInt(req.params.id as any, 10);
    const user = {
      id: req.user.id,
      role: req.user.role,
    };
    await issueServices.deleteIssue(issueId, user);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete issue",
      error: (error as any).message,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssueById,
};
