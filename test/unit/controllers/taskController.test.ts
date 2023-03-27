import { prismaMock } from "@root/test/helper/singleton";
import { getTaskController } from "@controllers/tasks.controllers";
import httpMocks from "node-mocks-http";
import { RESPONSE_CODE } from "@utils/types/response.types";
import prismaClient from "@configs/db.config";

describe("Tasks Controllers - Unit", () => {
  beforeEach(() => {
    prismaMock.task.findFirst.mockRejectedValue(new Error("Rejected Value"));
  });

  afterAll(async () => {
    await prismaMock.$disconnect();
    await prismaClient.$disconnect();
  });

  it("should return with 500 response code if an exception occurs", async () => {
    const req = httpMocks.createRequest({
      params: { id: "3142fa93-b2c2-4562-a35b-579d683524d4" },
    });
    const res = httpMocks.createResponse();

    await getTaskController(req, res);

    expect(res.statusCode).toBe(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
  });
});
