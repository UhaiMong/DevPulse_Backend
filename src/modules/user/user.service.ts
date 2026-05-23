import bcrypt from "bcrypt";
import type { IUser } from "./user.interface";
import { userQueries } from "./user.query";

export const userService = async (
  payload: Omit<IUser, "id" | "created_at" | "updated_at">,
) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const dbPayload = {
    ...payload,
    password: hashedPassword,
  };
  const newUser = await userQueries.createUserQuery(dbPayload);
  const { password, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};
