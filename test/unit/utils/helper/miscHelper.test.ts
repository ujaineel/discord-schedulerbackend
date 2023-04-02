import {
  correctDateValues,
  isEmail,
  isvalidUUID,
} from "@utils/helper/misc.helper";

describe("misc helpers", () => {
  describe("correctDateValues", () => {
    it("converts string to a date type value", () => {
      const body = {
        dueDate: "2023-01-24T14:32:31.020Z",
      };

      const expectedBody = {
        dueDate: new Date(body.dueDate),
      };

      expect(correctDateValues(body)).toEqual(expectedBody);
    });
  });

  describe("isValidUUID", () => {
    it("should return false if id provided is not of string type", () => {
      expect(isvalidUUID(324)).toBe(false);
    });

    it("should return true if id matches uuid pattern", () => {
      expect(isvalidUUID("2f9c16d4-88ab-49ec-8e55-626a48053822")).toBe(true);
    });

    it("should return false if id does not match uuid pattern", () => {
      expect(isvalidUUID("29c16d4-8ab-49ec-855-626a4805822")).toBe(false);
    });
  });

  describe("isEmail", () => {
    it("should return false if email provided is not of string type", () => {
      expect(isEmail({ email: "dsfdsf" })).toBe(false);
    });

    it("should return true if id matches email pattern", () => {
      expect(isEmail("test@unit.com")).toBe(true);
    });

    it("should return false if id does not match email pattern", () => {
      expect(isEmail("29c16d4-8ab-49ec-855-626a4805822")).toBe(false);
    });
  });
});
