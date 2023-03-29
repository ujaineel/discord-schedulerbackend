module.exports = {
  testEnvironment: "node",
  setupFiles: ["./test/helper/setup/setup-tests.ts"],
  clearMocks: true,
  moduleFileExtensions: ["ts", "js", "mjs", "node"],
  roots: ["<rootDir>/src", "<rootDir>/test"],
  setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper: {
    "^@routes/(.*)": "<rootDir>/src/routes/$1",
    "^@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "^@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "^@configs/(.*)": "<rootDir>/src/configs/$1",
    "^@models/(.*)": "<rootDir>/src/models/$1",
    "^@utils/(.*)": "<rootDir>/src/utils/$1",
    "^@test/unit/(.*)": "<rootDir>/test/unit/$1",
    "^@root/(.*)": "<rootDir>/$1",
  },
};
