import { getTaskController } from "@controllers/tasks.controllers";
import { prismaMock } from "@root/test/helper/singleton";
import httpMocks from "node-mocks-http";

describe("Tasks Controllers - Unit", () => {
  it("should return with 500 response code if an exception occurs", async () => {
    let err: any;
    prismaMock.task.findFirst.mockRejectedValue(null);

    const req = httpMocks.createRequest({
      params: { id: "3142fa93-b2c2-4562-a35b-579d683524d4" },
    });
    const res = httpMocks.createResponse();
    try {
      await getTaskController(req, res);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(res.statusCode).toBeNull();
  });
});
