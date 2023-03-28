import { isBoolean, isDate, isEmpty } from "lodash";
import { isvalidUUID } from "./misc.helper";

const isCreateTaskDto = (body: Record<any, any>): boolean => {
  if (isEmpty(body)) {
    console.log("Empty");
    return false;
  }

  return (
    (!isEmpty(body?.title) ?? false) &&
    ("content" in body ? !isEmpty(body.content) : true) &&
    ("published" in body ? isBoolean(body.published) : true) &&
    ("dueDate" in body ? isDate(body.dueDate) : true) &&
    (isvalidUUID(body?.userId) ?? false)
  );
};

export { isCreateTaskDto };
