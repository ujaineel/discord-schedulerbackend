export default function () {
  let operations = {
    GET,
    POST,
    PUT,
    DELETE,
  };

  function GET(req: any, res: any, _: any) {
    res.status(200).json([
      { id: 0, message: "First task" },
      { id: 1, message: "Second task" },
    ]);
  }

  function POST(req: any, res: any, _: any) {
    console.log(`About to create task: ${JSON.stringify(req.body)}`);
    res.status(201).send();
  }

  function PUT(req: any, res: any, _: any) {
    console.log(`About to update task id: ${req.query.id}`);
    res.status(200).send();
  }

  function DELETE(req: any, res: any, _: any) {
    console.log(`About to delete task id: ${req.query.id}`);
    res.status(200).send();
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

  POST.apiDoc = {
    summary: "Create task.",
    operationId: "createTask",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: "task",
        schema: {
          $ref: "#/definitions/Task",
        },
      },
    ],
    responses: {
      201: {
        description: "Created",
      },
    },
  };

  PUT.apiDoc = {
    summary: "Update task.",
    operationId: "updateTask",
    parameters: [
      {
        in: "query",
        name: "id",
        required: true,
        type: "string",
      },
      {
        in: "body",
        name: "task",
        schema: {
          $ref: "#/definitions/Task",
        },
      },
    ],
    responses: {
      200: {
        description: "Updated ok",
      },
    },
  };

  DELETE.apiDoc = {
    summary: "Delete task.",
    operationId: "deleteTask",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Delete",
      },
    },
  };

  return operations;
}
