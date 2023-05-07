import prismaClient from "@configs/db.config";
import server, { app } from "@root/src";
import { getLocalUser } from "@root/src/services/users.services";
import { correctDateValues, exclude } from "@utils/helper/misc.helper";
import { RESPONSE_CODE } from "@utils/types/response.types";
import request from "supertest";
import main from "../../../helper/setup/setup-db";

describe("User Routes", () => {
  beforeAll((done) => {
    done();
  });

  beforeEach(async () => {
    await main();
  }, 10000);

  afterAll(async () => {
    await prismaClient.$disconnect();
  }, 10000);

  afterEach(() => {
    server.close();
  }, 10000);

  describe("GET /user", () => {
    it("should return NOT FOUND status if no authenticated user found", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).get("/user");

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toBe(RESPONSE_CODE.NOT_FOUND);
      expect(parsedText).toEqual("No authenticated user");
    });

    it("should return user and OK status if authenticated user found", async () => {
      const response = await request(app)
        .post("/auth/local/login")
        .send({ username: "testusername1", password: "password1" });
      const cookies = response.headers["set-cookie"];
      console.log(cookies);
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).get("/user").set("Cookie", cookies);

      const expectedUserValues = correctDateValues(JSON.parse(text)?.data);
      const actualUserValues = exclude(
        (await getLocalUser({
          username: "testusername1",
        })) as unknown as Record<any, any>,
        ["password"]
      );

      expect(statusCode).toBe(RESPONSE_CODE.OK);
      expect(expectedUserValues).toEqual(actualUserValues);
    });
  });
});
