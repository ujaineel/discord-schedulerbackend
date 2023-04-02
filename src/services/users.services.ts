import prismaClient from "@configs/db.config";
import { type User } from "@prisma/client";
import { type CreateLocalUserDto } from "@utils/dtos/users.dtos";
import {
  areInvalidUserSearchOptions,
  isValidCreateLocalUserDto,
} from "@utils/helper/user.helper";
import { type LocalUserFetch } from "@utils/types/interfaces";
import { isEmpty } from "lodash";

const getLocalUser = async (options: LocalUserFetch): Promise<User | null> => {
  if (isEmpty(options) || areInvalidUserSearchOptions(options)) {
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

const createLocalUser = async (
  createLocalUserDto: CreateLocalUserDto
): Promise<User | null> => {
  if (
    isEmpty(createLocalUserDto) ||
    isValidCreateLocalUserDto(createLocalUserDto)
  ) {
    return null;
  }

  try {
    const user = await prismaClient.user.create({ data: createLocalUserDto });

    return user;
  } catch (error: any) {
    console.error(error, error.message, error.stack);
    throw new Error("An error occurred while trying to create user");
  }
};

export default { getLocalUser, createLocalUser };
