import { ISSUESTATUS, type ISSUETYPE } from "./issue.constant";

export type IssueType = (typeof ISSUETYPE)[keyof typeof ISSUETYPE];

export type IssueStatus = (typeof ISSUESTATUS)[keyof typeof ISSUESTATUS];

export interface IIssue {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}
