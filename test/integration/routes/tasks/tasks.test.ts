import request from "supertest";
import server, { app } from "@root/src";
import { RESPONSE_CODE } from "@utils/types/response.types";
import taskFixture from "../../../helper/fixtures/tasks/taskFixture.json";

describe("Tasks routes", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  describe("GET /:id", () => {
    const invalidId: string = "test-id";
    const validId: string = "3142fa93-b2c2-4562-a35b-579d683524d4";

    it("should return 400 (Bad Request) if id is not proper", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).get(`/tasks/${invalidId}`);

      const parsedText = JSON.parse(text);

      expect(statusCode).toEqual(RESPONSE_CODE.BAD_REQUEST);
      expect(parsedText?.message).toEqual("Invalid request. Provide proper id");
    });

    it("should return 404 (Bad Request) if id is not provided", async () => {
      const { status }: { status: number } = await request(app).get(`/tasks/`);

      expect(status).toEqual(RESPONSE_CODE.NOT_FOUND);
    });

    it("should return task if task found", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).get(`/tasks/${validId}`);

      const parsedText = JSON.parse(text);

      expect(statusCode).toEqual(RESPONSE_CODE.OK);
      expect(parsedText?.data).toEqual(taskFixture);
    });
  });
});
