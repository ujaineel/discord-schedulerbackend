/* eslint-disable @typescript-eslint/no-for-in-array */
import httpMocks from "node-mocks-http";
import sinon from "sinon";

describe("Misc Middlewares", () => {
  describe("showApiDocs", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const nextFn = sinon.stub();
    const env = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
    });

    afterEach(() => {
      process.env = env;
      nextFn.reset();
    });

    it("should move with next fn if env is not production", async () => {
      process.env.NODE_ENV = "development";

      const { env } = await import("@configs/app.config");
      const { showApiDocs } = await import("@middlewares/misc/misc.middleware");
      console.log(env);
      showApiDocs(req, res, nextFn);
      expect(nextFn.called).toBeTruthy();
    });

    it("should return NOT_FOUND if env is production", async () => {
      process.env.NODE_ENV = "production";

      const { env } = await import("@configs/app.config");
      const { showApiDocs } = await import("@middlewares/misc/misc.middleware");
      console.log(env);
      showApiDocs(req, res, nextFn);
      expect(nextFn.called).toBeFalsy();
    });
  });
});
