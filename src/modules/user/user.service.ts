import bcrypt from "bcrypt";
import type { IUser } from "./user.interface";
import { createUserQuery } from "./user.query";

export const userService = async (
  payload: Omit<IUser, "id" | "created_at" | "updated_at">,
) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const dbPayload = {
    ...payload,
    password: hashedPassword,
  };
  const newUser = await createUserQuery(dbPayload);
  const { password, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};
