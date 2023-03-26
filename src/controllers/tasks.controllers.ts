import { type Task } from "@prisma/client";
import { isvalidUUID } from "@utils/helper/misc.helper";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { type Request, type Response } from "express";
import { isEmpty } from "lodash";
import { getTask } from "../services/tasks.services";

const getTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = "Fetch Single Task Using ID"
   * #swagger.operationId = "getTask"
   * #swagger.parameters['id'] = {
   *  in: 'path',
   *  description: 'Task ID/UUID',
   *  required: true,
   * }
   */

  const id = req.params?.id;
  if (!isvalidUUID(id)) {
    // #swagger.responses[400] = { description: 'Bad Request. Please check if id is provided' }
    res
      .status(RESPONSE_CODE.BAD_REQUEST)
      .json({ message: "Invalid request. Provide proper id" });
    return;
  }

  try {
    const task: Task | null = await getTask(id);

    if (isEmpty(task)) {
      // #swagger.responses[204] = { description: 'No Task Found.' }
      res.status(RESPONSE_CODE.NO_CONTENT).json(null);
      return;
    }

    // #swagger.responses[200] = { description: 'Task Found', schema: { $ref: '#/components/schemas/Task' }}
    res.status(RESPONSE_CODE.OK).json({ data: task });
    return;
  } catch (error) {
    // #swagger.responses[500] = { description: 'Internal Server Error' }
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "ERROR: Error occurred while finding task" });
  }
};

export { getTaskController };
