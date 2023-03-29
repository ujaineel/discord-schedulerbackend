import { ENV } from "@utils/types/app.types";

describe("App Config", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("should return 8081 port if no PORT env provided", async () => {
    process.env.PORT = undefined;

    const { appPort } = await import("@configs/app.config");

    expect(appPort).toEqual(8081);
  });

  it("should return local env if no NODE_ENV provided", async () => {
    process.env.NODE_ENV = undefined;

    const { env } = await import("@configs/app.config");

    expect(env).toEqual(ENV.LOCAL);
  });
});
