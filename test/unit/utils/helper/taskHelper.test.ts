import { isCreateTaskDto, isPatchTaskDto } from "@utils/helper/task.helper";

describe("Task Helper Functions", () => {
  describe("isCreateTaskDto", () => {
    it("should return false if no object is provided", () => {
      expect(isCreateTaskDto({})).toBe(false);
    });

    it("should return false if required fields are not provided", () => {
      const body = {
        title: "test title #1",
      };

      const body2 = {
        userId: "18af73a8-14bd-4d5e-973a-53ddc99ddaa1",
      };

      expect(isCreateTaskDto(body)).toBe(false);
      expect(isCreateTaskDto(body2)).toBe(false);
    });

    it("should return true if proper due date", () => {
      expect(
        isCreateTaskDto({
          title: "test title #1",
          userId: "18af73a8-14bd-4d5e-973a-53ddc99ddaa1",
          dueDate: "2023-01-24T14:32:31.020Z",
        })
      ).toBe(true);
    });

    it("should return false if unknown fields provided compared to CreateTaskDto", () => {
      expect(
        isCreateTaskDto({
          title: "test title #1",
          userId: "18af73a8-14bd-4d5e-973a-53ddc99ddaa1",
          field: "jijmkisf",
        })
      ).toBe(true);
    });
  });

  describe("isPatchTaskDto", () => {
    it("should return false if no object is provided", () => {
      expect(isPatchTaskDto({})).toBe(false);
    });

    it("should return true if a proper field is provided", () => {
      const body = {
        title: "test title #1",
      };

      expect(isPatchTaskDto(body)).toBe(true);
    });

    it("should return true if proper due date", () => {
      expect(
        isPatchTaskDto({
          title: "test title #1",
          userId: "18af73a8-14bd-4d5e-973a-53ddc99ddaa1",
          dueDate: "2023-01-24T14:32:31.020Z",
        })
      ).toBe(true);
    });

    it("should return false if unknown fields provided compared to PatchTaskDto", () => {
      expect(
        isPatchTaskDto({
          title: "test title #1",
          userId: "18af73a8-14bd-4d5e-973a-53ddc99ddaa1",
          field: "jijmkisf",
        })
      ).toBe(true);
    });
  });
});
