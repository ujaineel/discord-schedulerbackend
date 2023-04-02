import {
  areValidSearchOptions,
  isValidCreateLocalUserDto,
} from "@utils/helper/user.helper";

describe("User Helper", () => {
  describe("areValidSearchOptions", () => {
    it("should return true if email is correct pattern and available", () => {
      expect(areValidSearchOptions({ email: "test@testing.com" })).toBe(true);
    });

    it("should return false if email is correct pattern and available", () => {
      expect(areValidSearchOptions({ email: "test@testin" })).toBe(false);
    });

    it("should return true if email not provided", () => {
      expect(areValidSearchOptions({})).toBe(true);
    });

    it("should return true if proper id", () => {
      expect(
        areValidSearchOptions({ id: "d5cbdf42-20f9-45e4-a32c-3bea37760a53" })
      ).toBe(true);
    });

    it("should return false if invalid id", () => {
      expect(areValidSearchOptions({ id: "dsfdsffsdf" })).toBe(false);
    });
  });

  describe("isValidCreateLocalUserDto", () => {
    const body = {
      email: "test@testing.com",
      username: "test",
      password: "password",
    };

    it("should return true if all appropriate values", () => {
      expect(isValidCreateLocalUserDto(body)).toBe(true);
    });

    it("should return false if a field is not provided except for email", () => {
      const { username, ...nonUsername } = body;
      const { email, ...nonEmail } = body;
      const { password, ...nonPassword } = body;
      expect(isValidCreateLocalUserDto(nonUsername)).toBe(false);
      expect(isValidCreateLocalUserDto(nonEmail)).toBe(true);
      expect(isValidCreateLocalUserDto(nonPassword)).toBe(false);
    });

    it("should return false if email provided is not valid", () => {
      const { email, ...rest } = body;

      expect(isValidCreateLocalUserDto({ rest, email: "testgsdfg" })).toBe(
        false
      );
    });
  });
});
