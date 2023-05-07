import { deserialize } from "@root/src/modules/auth/local/passportConfig";
import Sinon from "sinon";
import * as userServices from "@root/src/services/users.services";
import userFixture from "../../../helper/fixtures/users/userFixture.json";
import { correctDateValues, exclude } from "@utils/helper/misc.helper";
import { type User } from "@prisma/client";
import { store } from "@configs/db.config";

describe("Local Auth", () => {
  afterAll(async () => {
    await store.shutdown();
  });

  describe("deserialize", () => {
    let error: any;
    let user: any;
    const callback = (
      arg0: Error | null,
      arg1: boolean | Record<any, any>
    ): void => {
      error = arg0;
      user = arg1;
    };

    const testError = new Error("Test Error");
    const testId = "test-id";

    it("should fetch user", async () => {
      const resolvedUser = correctDateValues(userFixture) as unknown as User;
      Sinon.stub(userServices, "getLocalUser").resolves(resolvedUser);

      await deserialize(testId, callback);

      expect(error).toBe(null);
      expect(user).toEqual(exclude(resolvedUser, ["password"]));

      Sinon.restore();
    });

    it("should return null and user as false if no user found", async () => {
      Sinon.stub(userServices, "getLocalUser").resolves(null);

      await deserialize(testId, callback);

      expect(error).toBe(null);
      expect(user).toEqual(false);

      Sinon.restore();
    });

    it("should return an error and user id", async () => {
      Sinon.stub(userServices, "getLocalUser").throwsException(testError);

      await deserialize(testId, callback);

      expect(error).toBe(testError);
      expect(user).toEqual({ id: testId });

      Sinon.restore();
    });
  });
});
