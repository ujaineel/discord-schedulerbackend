import doc from "./basicInfo.mjs";
import swaggerAutogen from "swagger-autogen";

const outputFile = "../../swaggerOutput.json";
const endpointsFiles = ["../index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
