import prismaClient, { store } from "@configs/db.config";
import request from "supertest";
import server, { app } from "../../../../src/index";
import { RESPONSE_CODE } from "../../../../src/utils/types/response.types";

describe("meta routes", () => {
  afterEach(async () => {
    await prismaClient.$disconnect();
    server.close();
  });

  afterAll(async () => {
    await store.shutdown();
  });

  describe("GET /meta", () => {
    it("should return ok and 200 Ok status", async () => {
      const { status, text }: { status: number; text: string } = await request(
        app
      ).get("/meta");

      expect(status).toEqual(RESPONSE_CODE.OK);
      expect(text).toEqual("ok");
    });
  });

  describe("GET /ping", () => {
    it("should return pong", async () => {
      const { text }: { text: string } = await request(app).get("/ping");

      expect(text).toEqual("pong");
    });
  });
});
