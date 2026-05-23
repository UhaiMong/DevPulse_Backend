import { USERROLE } from "../../modules/user/user.constant";

export const issueModify = (
  reporter_id: number,
  user: {
    id: number;
    role: string;
  },
) => {
  const isOwner = reporter_id === user.id;

  const isMaintainer = user.role === USERROLE.MAINTAINER;

  return isOwner || isMaintainer;
};
