export const ISSUETYPE = {
  BUG: "bug",
  FEATURE_REQUEST: "feature_request",
} as const;

export const ISSUESTATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
} as const;
export type IssueType = (typeof ISSUETYPE)[keyof typeof ISSUETYPE];

export type IssueStatus = (typeof ISSUESTATUS)[keyof typeof ISSUESTATUS];
