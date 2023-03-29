import { ENV } from "@utils/types/app.types";

describe("ENV enum", () => {
  it("should have 4 env values", () => {
    const keys = Object.keys(ENV);

    expect(keys.length).toBe(5);

    expect(keys).toEqual([
      "CI",
      "LOCAL",
      "DEVELOPMENT",
      "TESTING",
      "PRODUCTION",
    ]);
  });

  it('should return "ci" for CI', () => {
    expect(ENV.CI).toEqual("ci");
  });

  it('should return "local" for LOCAL', () => {
    expect(ENV.LOCAL).toEqual("local");
  });

  it('should return "development" for DEVELOPMENT', () => {
    expect(ENV.DEVELOPMENT).toEqual("development");
  });

  it('should return "testing" for TESTING', () => {
    expect(ENV.TESTING).toEqual("testing");
  });

  it('should return "production" for PRODUCTION', () => {
    expect(ENV.PRODUCTION).toEqual("production");
  });
});
