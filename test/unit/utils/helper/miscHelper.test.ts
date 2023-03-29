import { correctDateValues } from "@utils/helper/misc.helper";

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
});
