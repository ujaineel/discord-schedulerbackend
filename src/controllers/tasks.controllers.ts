import { type Task } from "@prisma/client";
import { isvalidUUID } from "@utils/helper/misc.helper";
import { isCreateTaskDto, isPatchTaskDto } from "@utils/helper/task.helper";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { type Request, type Response } from "express";
import { isEmpty, isUndefined } from "lodash";
import {
  getTask,
  postTask,
  patchTask,
  deleteTask,
} from "../services/tasks.services";

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
  try {
    const id = req.params?.id;
    const userId = req.user?.id;
    if (!isvalidUUID(id)) {
      // #swagger.responses[400] = { description: 'Bad Request. Please check if id is provided' }
      res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .json({ message: "Invalid request. Provide proper id" });
      return;
    }

    const task: Task | null = await getTask(id);

    if (task?.userId !== userId) {
      res.status(RESPONSE_CODE.FORBIDDEN).json({ message: "Forbidden" });
      return;
    }

    if (isEmpty(task)) {
      // #swagger.responses[200] = { description: 'No Task Found.' }
      res.status(RESPONSE_CODE.OK).json({ data: null });
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

const postTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = "Create Single Task"
   * #swagger.operationId = "postTask"
   * #swagger.requestBody = {
   *  required: true,
   *  "@content": {
   *    "application/json": {
   *      schema: {
   *        type: "object"
   *        properties: {
   *          title: {
   *            type: "string"
   *          },
   *          content: {
   *            type: "string"
   *          },
   *          published: {
   *            type: "boolean"
   *          },
   *          dueDate: {
   *            type: "string",
   *            format: "date-time"
   *          },
   *          userId: {
   *            type: "string"
   *          }
   *        },
   *        required: ["title", "userId"]
   *      }
   *    }
   *  }
   * }
   */
  try {
    const createTaskDto = { ...req.body, userId: req?.user?.id };

    if (!isCreateTaskDto(createTaskDto)) {
      // #swagger.responses[400] = { description: 'Bad Request. Please check if data provided is proper' }
      res.status(RESPONSE_CODE.BAD_REQUEST).json({
        message: "Bad request. Please check if data provided is proper",
      });

      console.log(JSON.stringify(createTaskDto));
      return;
    }

    const task: Task = await postTask(createTaskDto);

    // #swagger.responses[201] = { description: 'Task Created', schema: { $ref: '#/definition/Task' }}
    res.status(RESPONSE_CODE.CREATED).json({ data: task });
    return;
  } catch (error) {
    // #swagger.responses[500] = { description: 'Internal Server Error' }
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "ERROR: Error occurred while finding task" });
  }
};

const patchTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = "Patch/Update Single Task"
   * #swagger.operationId = "patchTask"
   * #swagger.requestBody = {
   *  required: true,
   *  "@content": {
   *    "application/json": {
   *      schema: {
   *        type: "object"
   *        properties: {
   *          title: {
   *            type: "string"
   *          },
   *          content: {
   *            type: "string"
   *          },
   *          published: {
   *            type: "boolean"
   *          },
   *          dueDate: {
   *            type: "string",
   *            format: "date-time"
   *          },
   *          userId: {
   *            type: "string"
   *          }
   *        },
   *        required: []
   *      }
   *    }
   *  }
   * }
   */

  const id = req.params?.id;
  if (!isvalidUUID(id)) {
    // #swagger.responses[400] = { description: 'Bad Request. Please check if data provided is proper' }
    res.status(RESPONSE_CODE.BAD_REQUEST).json({
      message: "Bad request. Please check if id is of UUID type",
    });

    console.log(`Invalid UUID for task: ${id}`);
    return;
  }

  const patchTaskDto = req.body;
  if (!isPatchTaskDto(req.body)) {
    // #swagger.responses[400] = { description: 'Bad Request. Please check if data provided is proper' }
    res.status(RESPONSE_CODE.BAD_REQUEST).json({
      message: "Bad request. Please check if data provided is proper",
    });

    console.log(JSON.stringify(patchTaskDto));
    return;
  }

  try {
    const task: Task = await patchTask({ id, patchTaskDto });

    // #swagger.responses[200] = { description: 'Task Patched/Updated', schema: { $ref: '#/definition/Task' }}
    res.status(RESPONSE_CODE.OK).json({ data: task });
    return;
  } catch (error) {
    // #swagger.responses[500] = { description: 'Internal Server Error' }
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "ERROR: Error occurred while finding task" });
  }
};

const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  /**
   * #swagger.tags = ['Tasks']
   * #swagger.summary = "Delete Single Task Using ID"
   * #swagger.operationId = "deleteTask"
   * #swagger.parameters['id'] = {
   *  in: 'path',
   *  description: 'Task ID/UUID',
   *  required: true,
   * }
   */

  const id = req.params?.id;
  if (!isvalidUUID(id)) {
    // #swagger.responses[400] = { description: 'Bad Request. Please check if data provided is proper' }
    res.status(RESPONSE_CODE.BAD_REQUEST).json({
      message: "Bad request. Please check if id is of UUID type",
    });

    console.log(`Invalid UUID for task: ${id}`);
    return;
  }

  try {
    // #swagger.responses[200] = { description: 'Task Deleted' }
    const task = await deleteTask(id);

    res.status(RESPONSE_CODE.OK).json({
      deleted: !isUndefined(task),
    });
    return;
  } catch (error: any) {
    // #swagger.responses[] = { description: 'Internal Server Error' }
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      message: "ERROR: Error occurred while deleting task",
      deleted: false,
    });
  }
};

export default {
  getTaskController,
  postTaskController,
  patchTaskController,
  deleteTaskController,
};
