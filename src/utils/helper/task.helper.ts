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

export { isCreateTaskDto };
