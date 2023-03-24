import { type NextFunction, type Request, type Response } from "express";

export default function (): any {
  const operations = {
    GET,
  };

  function GET(req: Request, res: Response, _: NextFunction): void {
    res.status(200).json([
      { id: 0, message: "First task" },
      { id: 1, message: "Second task" },
    ]);
  }

  GET.apiDoc = {
    summary: "Fetch tasks.",
    operationId: "getTasks",
    responses: {
      200: {
        description: "List of tasks.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/Task",
          },
        },
      },
    },
  };

  return operations;
}
