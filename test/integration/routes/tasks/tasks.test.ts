import request from "supertest";
import server, { app } from "../../../../src/index";
import { RESPONSE_CODE } from "../../../../src/utils/types/response.types";
import taskFixture from "../../../helper/fixtures/tasks/taskFixture.json";
import createTaskDtoFixture from "../../../helper/fixtures/tasks/createTaskDtoFixture.json";
import main from "../../../helper/setup/setup-db";
import prismaClient from "../../../../src/configs/db.config";
import { type Task } from "@prisma/client";

describe("Tasks routes", () => {
  beforeEach(async () => {
    await main();
  }, 7500);

  afterEach(async () => {
    await prismaClient.$disconnect();
    server.close();
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

  describe("POST /", () => {
    it("should return 201 (Created) if proper req.body provided", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app)
          .post("/tasks/")
          .send(createTaskDtoFixture)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");

      const data: Task = JSON.parse(text)?.data;

      expect(statusCode).toEqual(RESPONSE_CODE.CREATED);

      const { text: fetchedTask }: { text: any } = await request(app).get(
        `/tasks/${data.id}`
      );
      const taskFetched: Task = JSON.parse(fetchedTask)?.data;

      expect(data).toEqual(taskFetched);
    });

    it("should return 400 (Bad Request) if req.body is not appropriate", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).post("/tasks/").send({});

      const message = JSON.parse(text)?.message;

      expect(statusCode).toEqual(RESPONSE_CODE.BAD_REQUEST);
      expect(message).toEqual(
        "Bad request. Please check if data provided is proper"
      );
    });
  });
});
