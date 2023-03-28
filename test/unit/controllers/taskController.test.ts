import { prismaMock } from "@root/test/helper/singleton";
import taskController from "@controllers/tasks.controllers";
import httpMocks from "node-mocks-http";
import { RESPONSE_CODE } from "@utils/types/response.types";
import createTaskDtoFixture from "../../helper/fixtures/tasks/createTaskDtoFixture.json";

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
  });
});
