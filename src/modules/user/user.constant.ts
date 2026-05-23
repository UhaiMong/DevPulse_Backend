export const USERROLE = {
  CONTRIBUTOR: "contributor",
  MAINTAINER: "maintainer",
} as const;

export type Role = (typeof USERROLE)[keyof typeof USERROLE];
