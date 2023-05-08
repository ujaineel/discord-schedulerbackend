import { prismaMock, prismaSessionStoreMock } from "../../helper/singleton";
import { type User } from "@prisma/client";
import {
  createLocalUser,
  getLocalUser,
} from "@root/src/services/users.services";
import { correctDateValues } from "@utils/helper/misc.helper";
import { type LocalUserFetch } from "@utils/types/interfaces";
import userFixture from "../../helper/fixtures/users/userFixture.json";
import { type CreateLocalUserDto } from "@utils/dtos/users.dtos";

describe("User Services", () => {
  afterAll(async () => {
    await prismaSessionStoreMock.shutdown();
  });

  describe("getLocalUser", () => {
    const invalidId: string = "23234";
    const invalidEmail: string = "23234";

    const testUser = correctDateValues(userFixture) as unknown as User;

    it("should return null if no options provided", async () => {
      expect(await getLocalUser({})).toBe(null);
    });

    it("should return null if options are not valid", async () => {
      const options: LocalUserFetch = {
        id: invalidId,
      };

      expect(await getLocalUser({ id: invalidId, email: invalidEmail })).toBe(
        null
      );
      expect(await getLocalUser({ email: invalidEmail })).toBe(null);
      expect(await getLocalUser(options)).toBe(null);
    });

    it("should return true if all options are valid", async () => {
      prismaMock.user.findFirst.mockResolvedValue(testUser);

      const options: LocalUserFetch = {
        id: "c92bcdf6-677b-4e46-8c08-acd84512b466",
        email: "Cornelius.Windler@yahoo.com",
        username: "Cynthia.Hilpert",
      };

      const user: User | null = await getLocalUser(options);
      expect(user).toEqual(testUser);
    });
  });

  describe("createLocalUser", () => {
    const createLocalUserDto: CreateLocalUserDto = {
      email: "test@testing.com",
      username: "test",
      password: "password",
    };

    const userFixture: User = {
      id: "e92bcdf6-677b-4e46-8c08-acd84512b466",
      username: "test",
      password: "password",
      deletedAt: null,
      email: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it("should return null if not valid dto object is empty", async () => {
      const user: User | null = await createLocalUser({
        ...createLocalUserDto,
        email: "test@testing",
      });

      expect(user).toBe(null);
    });

    it("should return user if user created", async () => {
      prismaMock.user.create.mockResolvedValue(userFixture);

      const user: User | null = await createLocalUser(createLocalUserDto);

      expect(user).toBe(userFixture);
    });

    it.failing("should fail if error thrown", async () => {
      prismaMock.user.create.mockRejectedValue(new Error("Error Occurred"));

      const user: User | null = await createLocalUser(createLocalUserDto);

      expect(user).toBe(userFixture);
    });
  });
});
