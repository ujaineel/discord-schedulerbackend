import {
  prismaMock,
  prismaSessionStoreMock,
} from "@root/test/helper/singleton";
import taskController from "@controllers/tasks.controllers";
import httpMocks from "node-mocks-http";
import { RESPONSE_CODE } from "@utils/types/response.types";
import createTaskDtoFixture from "../../helper/fixtures/tasks/createTaskDtoFixture.json";
import patchTaskDtoFixture from "../../helper/fixtures/tasks/patchTaskDtoFixture.json";
import { type Request, type Response } from "express";
import * as miscHelpers from "@utils/helper/misc.helper";

const mockPostTalk = jest.fn();
jest.mock("../../../src/services/tasks.services.ts", () => {
  return jest.fn().mockImplementation(() => {
    return { postTask: mockPostTalk };
  });
});

describe("Tasks Controllers - Unit", () => {
  describe("getTaskController", () => {
    beforeEach(() => {
      prismaMock.task.findFirst.mockRejectedValue(new Error("Rejected Value"));
    });

    afterAll(async () => {
      await prismaMock.$disconnect();
    });

    it("should return with 500 response code if an exception occurs", async () => {
      const req = httpMocks.createRequest({
        params: { id: "3142fa93-b2c2-4562-a35b-579d683524d4" },
      });
      const res = httpMocks.createResponse();

      await taskController.getTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    });
  });

  describe("postTaskController", () => {
    beforeEach(() => {
      prismaMock.task.create.mockImplementation();
    });

    afterAll(async () => {
      await prismaMock.$disconnect();
    });

    it("should return with 500 response code if error occurs", async () => {
      prismaMock.task.create.mockRejectedValue(null);

      const req = httpMocks.createRequest({
        body: createTaskDtoFixture,
      });
      const res = httpMocks.createResponse();

      await taskController.postTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    });

    it("should return with 500 response code if no task provided", async () => {
      const req = httpMocks.createRequest({
        body: createTaskDtoFixture,
      });
      const res = httpMocks.createResponse();

      await taskController.postTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    });
  });

  describe("patchTaskController", () => {
    beforeEach(() => {
      prismaMock.task.create.mockImplementation();
    });

    afterAll(async () => {
      await prismaMock.$disconnect();
      await prismaSessionStoreMock.shutdown();
    });

    it("should return with 500 response if error occurs", async () => {
      const req: Request = httpMocks.createRequest({
        body: patchTaskDtoFixture,
        params: { id: "3142fa93-b2c2-4562-a35b-579d683524d4" },
      });

      const res: Response = httpMocks.createResponse();

      await taskController.patchTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    });

    it("should return with 400 response code if not valid UUID", async () => {
      const mockIsValidUUID = jest.spyOn(miscHelpers, "isvalidUUID");

      const req: Request = httpMocks.createRequest({
        body: patchTaskDtoFixture,
        params: { id: "test-deal" },
      });

      const res: Response = httpMocks.createResponse();

      await taskController.patchTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.BAD_REQUEST);
      expect(mockIsValidUUID).toBeCalled();
    });
  });

  describe("deleteTaskController", () => {
    beforeEach(() => {
      prismaMock.task.delete.mockImplementation();
    });

    afterAll(async () => {
      await prismaMock.$disconnect();
    });

    it("should return BAD REQUEST response code if not valid UUID", async () => {
      const mockIsValidUUID = jest.spyOn(miscHelpers, "isvalidUUID");

      const req: Request = httpMocks.createRequest({
        params: { id: "test-deal" },
      });

      const res: Response = httpMocks.createResponse();

      await taskController.deleteTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.BAD_REQUEST);
      expect(mockIsValidUUID).toBeCalledWith("test-deal");
    });

    it("should return INTERNAL SERVER ERROR response code if an error occurs", async () => {
      const mockIsValidUUID = jest.spyOn(miscHelpers, "isvalidUUID");

      prismaMock.task.delete.mockRejectedValue(new Error());

      const req: Request = httpMocks.createRequest({
        params: { id: "3142fa93-b2c2-4562-a35b-579d683524d4" },
      });

      const res: Response = httpMocks.createResponse();

      await taskController.deleteTaskController(req, res);

      expect(res.statusCode).toBe(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
      expect(mockIsValidUUID).toBeCalled();
    });
  });
});
