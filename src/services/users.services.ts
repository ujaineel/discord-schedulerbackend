import prismaClient from "@configs/db.config";
import { type User } from "@prisma/client";
import { areInvalidOptions } from "@utils/helper/user.helper";
import { type LocalUserFetch } from "@utils/types/interfaces";
import { isEmpty } from "lodash";

const getLocalUser = async (options: LocalUserFetch): Promise<User | null> => {
  if (isEmpty(options) || areInvalidOptions(options)) {
    return null;
  }

  try {
    const user = await prismaClient.user.findUnique({ where: { ...options } });

    return user;
  } catch (error: any) {
    console.error(error, error.message, error.stack);
    throw new Error("An error occurred while trying to fetch user");
  }
};
