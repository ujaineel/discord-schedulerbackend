import { isEmpty } from "lodash";

const isCreateTaskDto = (body: Record<any, any>): boolean => {
  if (isEmpty(body)) {
    return false;
  }

  return (
    typeof body?.title === "string" &&
    (typeof body.content === "string" ?? true) &&
    (typeof body.published === "boolean" ?? true) &&
    typeof body.userId === "string"
  );
};

export { isCreateTaskDto };
