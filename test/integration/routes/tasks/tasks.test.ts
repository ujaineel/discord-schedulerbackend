import request from "supertest";
import server, { app } from "../../../../src/index";
import { RESPONSE_CODE } from "../../../../src/utils/types/response.types";
import taskFixture from "../../../helper/fixtures/tasks/taskFixture.json";
import createTaskDtoFixture from "@root/test/helper/fixtures/tasks/createTaskDtoFixture.json";
import main from "../../../helper/setup/setup-db";
import prismaClient from "../../../../src/configs/db.config";
import { type Task } from "@prisma/client";

describe("Tasks routes", () => {
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

    it("should return 200 response code and task if task found", async () => {
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).get(`/tasks/${validId}`);

      const parsedText = JSON.parse(text);

      expect(statusCode).toEqual(RESPONSE_CODE.OK);
      expect(parsedText?.data).toEqual(taskFixture);
    });

    it("should return 200 if task not found", async () => {
      const taskIdNotUsed = "18af73a8-14bd-4d5e-973a-53ddc99ddaa1";
      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).get(`/tasks/${taskIdNotUsed}`);

      const parsedText = JSON.parse(text)?.data;

      expect(statusCode).toEqual(RESPONSE_CODE.OK);
      expect(parsedText).toEqual([]);
    });
  });

  describe("postTaskController", () => {
    it("should return a BAD REQUEST response code if not proper req.body", async () => {
      const reqBody = {
        ...createTaskDtoFixture,
        title: null,
      };

      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).post("/tasks/").send(reqBody);

      const parsedText = JSON.parse(text)?.message;

      expect(statusCode).toEqual(RESPONSE_CODE.BAD_REQUEST);
      expect(parsedText).toEqual(
        "Bad request. Please check if data provided is proper"
      );
    });

    it("should return a CREATED response code if task created", async () => {
      const reqBody = createTaskDtoFixture;

      const { statusCode, text }: { statusCode: number; text: any } =
        await request(app).post("/tasks/").send(reqBody);

      const task: Task = JSON.parse(text)?.data;
      const taskId: string = task?.id;

      const { statusCode: fetchStatus, text: fetchedTask } = await request(
        app
      ).get(`/tasks/${taskId}`);
      const parsedTask: Task = JSON.parse(fetchedTask)?.data;

      expect(statusCode).toEqual(RESPONSE_CODE.CREATED);
      expect(task).toBeDefined();

      expect(fetchStatus).toEqual(RESPONSE_CODE.OK);
      expect(parsedTask).toEqual(task);
    });
  });
});
