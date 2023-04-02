import prismaClient from "@configs/db.config";
import { type User } from "@prisma/client";
import { type CreateLocalUserDto } from "@utils/dtos/users.dtos";
import {
  areValidSearchOptions,
  isValidCreateLocalUserDto,
} from "@utils/helper/user.helper";
import { type LocalUserFetch } from "@utils/types/interfaces";
import { isEmpty } from "lodash";
import { hash, genSalt } from "bcrypt";

const getLocalUser = async (options: LocalUserFetch): Promise<User | null> => {
  if (isEmpty(options) || !areValidSearchOptions(options)) {
    return null;
  }

  try {
    const user = await prismaClient.user.findFirst({ where: { ...options } });

    return user;
  } catch (error: any) {
    /* istanbul ignore next */
    console.error(error, error.message, error.stack);
    /* istanbul ignore next */
    throw new Error("An error occurred while trying to fetch user");
  }
};

const createLocalUser = async (
  createLocalUserDto: CreateLocalUserDto
): Promise<User | null> => {
  if (!isValidCreateLocalUserDto(createLocalUserDto)) {
    return null;
  }

  try {
    const salt: string = await genSalt(10);
    const hashedPassword: string = await hash(
      createLocalUserDto.password,
      salt
    );

    const user: User = await prismaClient.user.create({
      data: { ...createLocalUserDto, password: hashedPassword },
    });

    return user;
  } catch (error: any) {
    console.error(error, error.message, error.stack);
    throw new Error("An error occurred while trying to create user");
  }
};

export { getLocalUser, createLocalUser };
