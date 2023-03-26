import request from "supertest";
import server, { app } from "@root/src";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { prismaMock } from "@root/test/helper/singleton";
import taskFixture from "../../helper/fixtures/tasks/taskFixture.json";
import { correctDateValues } from "@utils/helper/misc.helper";

describe("Tasks routes", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    void prismaMock.$disconnect();
    server.close();
    done();
  });

  describe("GET /:id", () => {
    const invalidId: string = "test-id";
    const validId: string = "3142fa93-b2c2-4562-a35b-579d683524d4";

    beforeEach(() => {
      prismaMock.task.findFirst.mockResolvedValue(
        correctDateValues(taskFixture)
      );
    });

    it("should return 400 (Bad Request) if id is not proper", async () => {
      const { status, text }: { status: number; text: string } = await request(
        app
      ).get(`/tasks/${invalidId}`);

      expect(status).toEqual(RESPONSE_CODE.BAD_REQUEST);
      expect(text).toEqual('"Invalid request. Provide proper id"');
    });

    it("should return 404 (Bad Request) if id is not provided", async () => {
      const { status }: { status: number } = await request(app).get(`/tasks/`);

      expect(status).toEqual(RESPONSE_CODE.NOT_FOUND);
    });

    it("should return task if task found", async () => {
      const response = await request(app).get(`/tasks/${validId}`);

      console.log(JSON.stringify(response));
    });
  });
});
