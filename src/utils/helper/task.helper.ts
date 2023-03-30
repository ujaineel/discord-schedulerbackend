import { isBoolean, isEmpty } from "lodash";
import { isvalidUUID } from "./misc.helper";

const isCreateTaskDto = (body: Record<any, any>): boolean => {
  if (isEmpty(body)) {
    console.log("Empty");
    return false;
  }

  const createFields = ["title", "content", "published", "dueDate", "userId"];
  const fields = Object.keys(body);
  const knownFields = fields.every((value) => {
    return createFields.includes(value);
  });

  return knownFields
    ? ("title" in body ? !isEmpty(body?.title) : false) &&
        ("content" in body ? !isEmpty(body.content) : true) &&
        ("published" in body ? isBoolean(body.published) : true) &&
        ("dueDate" in body && typeof body.dueDate === "string"
          ? !isNaN(Date.parse(body?.dueDate))
          : true) &&
        ("userId" in body ? isvalidUUID(body?.userId) : false)
    : false;
};

const isPatchTaskDto = (body: Record<any, any>): boolean => {
  if (isEmpty(body)) {
    console.log("Empty PatchTaskDto");
    return false;
  }

  const patchFields = ["title", "content", "published", "dueDate"];
  const fields = Object.keys(body);
  const knownFields = fields.every((value) => {
    return patchFields.includes(value);
  });

  return knownFields
    ? ("title" in body ? !isEmpty(body.title) : true) &&
        ("content" in body ? !isEmpty(body.content) : true) &&
        ("published" in body ? isBoolean(body.published) : true) &&
        ("dueDate" in body && typeof body.dueDate === "string"
          ? !isNaN(Date.parse(body.dueDate))
          : true)
    : false;
};

export { isCreateTaskDto, isPatchTaskDto };
