import { type PrismaClient } from "@prisma/client";
import { type PrismaSessionStore } from "@quixo3/prisma-session-store";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";

import prisma, { store } from "../../src/configs/db.config";

jest.mock("../../src/configs/db.config", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
  store: mockDeep<PrismaSessionStore>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
  mockReset(prismaSessionStoreMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
export const prismaSessionStoreMock =
  store as unknown as DeepMockProxy<PrismaSessionStore>;
