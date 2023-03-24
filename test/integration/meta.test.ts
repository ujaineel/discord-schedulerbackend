import request from "supertest";
import { app } from "../../src/index";
import { RESPONSE_CODE } from "../../src/utils/types/ResponseCode";

describe("meta routes", () => {
  describe("GET /meta", () => {
    it("should return ok and 200 Ok status", async () => {
      const { status, text }: { status: number; text: string } = await request(
        app
      ).get("/meta/");

      expect(status).toEqual(RESPONSE_CODE.OK);
      expect(text).toEqual("ok");
    });
  });
});
