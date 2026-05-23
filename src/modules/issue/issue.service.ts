import { issueModify } from "../../middleware/auth/authorization";
import { userQueries } from "../user/user.query";
import { ISSUESTATUS, ISSUETYPE } from "./issue.constant";
import type { IIssue } from "./issue.interface";
import { issuesQuery } from "./issue.query";
// import { createIssueQuery } from "./issue.query";

const createIssue = async (
  payload: any,
  user: {
    id: number;
    role: string;
  },
) => {
  const authorized = issueModify(payload.reporter_id, user);
  if (!authorized) {
    throw new Error("Forbidden Access!");
  }
  return await issuesQuery.createIssueQuery(payload);
};

// get All issues

const getAllIssues = async (query: any) => {
  const { ...q } = query;
  const allIssues = issuesQuery.getAllIssues(q);
  const issuesWithRepoter = await Promise.all(
    (await allIssues).map(async (issue) => {
      const reporter = await userQueries.getSingleUserById(issue.reporter_id);
      return { ...issue, reporter };
    }),
  );
  return issuesWithRepoter;
};

// Update issues

const updateIssue = async (
  issueId: number,
  payload: Pick<IIssue, "title" | "description" | "type" | "status">,
  user: {
    id: number;
    name: string;
    role: string;
  },
) => {
  const issue = await issuesQuery.getIssueById(issueId);

  if (!issue) {
    throw new Error("Issue not found!");
  }

  const authorized = issueModify(issue.reporter_id, user);
  if (!authorized) {
    throw new Error("Forbidden Access!");
  }
  return await issuesQuery.updateIssue(payload, issueId);
};

// Delete Issue query
const deleteIssue = async (
  issueId: number,
  user: {
    id: number;
    role: string;
  },
) => {
  const issue = await issuesQuery.getIssueById(issueId);

  if (!issue) {
    throw new Error("Issue not found!");
  }

  const authorized = issueModify(issue.reporter_id, user);
  if (!authorized) {
    throw new Error("Forbidden Access!");
  }
  return await issuesQuery.deleteIssueQuery(issueId);
};

export const issueServices = {
  createIssue,
  updateIssue,
  deleteIssue,
  getAllIssues,
};
