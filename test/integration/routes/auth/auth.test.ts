import prismaClient, { store } from "@configs/db.config";
import server, { app } from "@root/src";
import main from "@root/test/helper/setup/setup-db";
import { type CreateLocalUserDto } from "@utils/dtos/users.dtos";
import { RESPONSE_CODE } from "@utils/types/response.types";
import Sinon from "sinon";
import request from "supertest";
import userFixture from "../../../helper/fixtures/users/userFixture.json";
import * as userServices from "@root/src/services/users.services";
import { createUserFixture } from "@root/test/helper/fixtures/users/user.fixture";
import { type User } from "@prisma/client";

describe("Auth Routes", () => {
  beforeAll((done) => {
    done();
  });

  beforeEach(async () => {
    await main();
  }, 10000);

  afterAll(async () => {
    await prismaClient.$disconnect();
    server.close();
    await store.shutdown();
  }, 10000);

  afterEach(() => {
    server.close();
  }, 10000);

  describe("POST /auth/local/login", () => {
    const reqBody = {
      username: "24234211934njfnerfod",
      password: "password1234321",
    };

    it("should send NOT_FOUND status if no user exists to login", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).post(`/auth/local/login`).send(reqBody);

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toEqual(RESPONSE_CODE.NOT_FOUND);
      expect(parsedText).toEqual("No User Exists");
    });

    it("should send NOT_FOUND status if user password is wrong", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app)
          .post(`/auth/local/login`)
          .send({ ...reqBody, username: userFixture.username });

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toEqual(RESPONSE_CODE.NOT_FOUND);
      expect(parsedText).toEqual("No User Exists");
    });

    it("should send ACCEPTED status if user password is correct", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app)
          .post(`/auth/local/login`)
          .send({ password: "password1", username: "testusername1" });

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toEqual(RESPONSE_CODE.OK);
      expect(parsedText).toEqual("Successfully Authenticated");
    });

    it("should send NOT_FOUND status if no credentials provided", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).post(`/auth/local/login`).send({});

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toEqual(RESPONSE_CODE.NOT_FOUND);
      expect(parsedText).toEqual("No User Exists");
    });

    it.failing(
      "should return Internal Server status if error thrown",
      async () => {
        const localUserStub = Sinon.stub(
          userServices,
          "getLocalUser"
        ).rejects();

        const { statusCode, text }: { statusCode: number; text: any } =
          await request(app)
            .post(`/auth/local/login`)
            .send({ password: "password1", username: "testusername1" });

        const parsedtext = JSON.parse(text)?.message;

        expect(statusCode).toEqual(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
        expect(parsedtext).toEqual(
          "INTERNAL SERVER ERROR: An error occurred while authenticating"
        );

        localUserStub.restore();
      }
    );
  });

  describe("POST /auth/local/register", () => {
    beforeEach(() => {
      Sinon.restore();
    });
    const createLocalUserDtoExisting: CreateLocalUserDto = {
      username: "testusername1",
      password: "password1",
    };

    const createLocalUserDtoNew: CreateLocalUserDto = {
      username: "testusername2",
      password: "password2",
    };

    it("should return FORBIDDEN if user already exists", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app)
          .post(`/auth/local/register`)
          .send(createLocalUserDtoExisting);

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toBe(RESPONSE_CODE.FORBIDDEN);
      expect(parsedText).toEqual("User Already Exists");
    });

    it("should create new user if user does not exist", async () => {
      const fixture = createUserFixture(createLocalUserDtoNew) as User;
      Sinon.stub(userServices, "createLocalUser").resolves(fixture);

      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app)
          .post(`/auth/local/register`)
          .send(createLocalUserDtoNew);

      const parsedText = JSON.parse(text);

      expect(statusCode).toBe(RESPONSE_CODE.CREATED);
      expect(parsedText?.message).toEqual("User Created");
      expect(parsedText?.username).toEqual(createLocalUserDtoNew.username);
    });
  });
});
