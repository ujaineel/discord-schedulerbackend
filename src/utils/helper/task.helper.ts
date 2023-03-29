import { isBoolean, isEmpty } from "lodash";
import { isvalidUUID } from "./misc.helper";

const isCreateTaskDto = (body: Record<any, any>): boolean => {
  if (isEmpty(body)) {
    console.log("Empty");
    return false;
  }

  return (
    ("title" in body ? !isEmpty(body?.title) : false) &&
    ("content" in body ? !isEmpty(body.content) : true) &&
    ("published" in body ? isBoolean(body.published) : true) &&
    ("dueDate" in body && typeof body.dueDate === "string"
      ? !isNaN(Date.parse(body?.dueDate))
      : true) &&
    ("userId" in body ? isvalidUUID(body?.userId) : false)
  );
};

const isPatchTaskDto = (body: Record<any, any>): boolean => {
  if (isEmpty(body)) {
    console.log("Empty PatchTaskDto");
    return false;
  }

  return (
    ("title" in body ? !isEmpty(body.title) : true) &&
    ("content" in body ? !isEmpty(body.content) : true) &&
    ("published" in body ? isBoolean(body.published) : true) &&
    ("dueDate" in body && typeof body.dueDate === "string"
      ? !isNaN(Date.parse(body.dueDate))
      : true) &&
    ("deletedAt" in body && typeof body?.deletedAt === "string"
      ? !isNaN(Date.parse(body.deletedAt))
      : true)
  );
};

export { isCreateTaskDto, isPatchTaskDto };
