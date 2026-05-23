import { ISSUESTATUS } from "../../modules/issue/issue.constant";
import { USERROLE } from "../../modules/user/user.constant";

export const isAllowed = (
  reporter_id: number,
  user: {
    id: number;
    role: string;
  },
  issueStatus?: string,
) => {
  const isMaintainer = user.role === USERROLE.MAINTAINER;
  if (isMaintainer) return true;

  const isOwner = reporter_id === user.id;
  const isOpen = issueStatus === ISSUESTATUS.OPEN;
  // To update: contributor = status: open
  return isOwner && isOpen;
};

export const isAllowedToDelete = (
  reporter_id: number,
  user: { id: number; role: string },
) => {
  const isMaintainer = user.role === USERROLE.MAINTAINER;
  if (isMaintainer) return true;

  // contributor only own issue
  return reporter_id === user.id;
};
