/* eslint-disable @typescript-eslint/no-for-in-array */
import prismaClient from "@configs/db.config";
import {
  prismaMock,
  prismaSessionStoreMock,
} from "@root/test/helper/singleton";
import httpMocks from "node-mocks-http";

describe("Misc Middlewares", () => {
  describe("showApiDocs", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const nextFn = jest.fn();
    const env = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
    });

    afterEach(() => {
      process.env = env;
    });

    afterAll(async () => {
      await prismaMock.$disconnect();
      await prismaClient.$disconnect();
      await prismaSessionStoreMock.shutdown();
    });

    it("should move with next fn if env is not production", async () => {
      process.env.NODE_ENV = "development";

      await import("@configs/app.config");
      const { showApiDocs } = await import("@middlewares/misc/misc.middleware");

      showApiDocs(req, res, nextFn);
      expect(nextFn).toHaveBeenCalled();
    });

    it("should return NOT_FOUND if env is production", async () => {
      process.env.NODE_ENV = "production";

      await import("@configs/app.config");
      const { showApiDocs } = await import("@middlewares/misc/misc.middleware");

      showApiDocs(req, res, nextFn);
      expect(nextFn).not.toHaveBeenCalled();
    });
  });
});
