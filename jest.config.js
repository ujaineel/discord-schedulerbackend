module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  clearMocks: true,
  moduleFileExtensions: ["ts", "js", "node"],
  roots: ["<rootDir>/src", "<rootDir>/test"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        diagnostics: false,
      },
    ],
  },
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
