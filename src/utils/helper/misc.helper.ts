import { isDate } from "lodash";

export const correctDateValues = (object: Record<string, unknown>): any => {
  const objectCopy = { ...object };

  let property;
  for (property in object) {
    const value = object[property];
    if (typeof value === "string" && isDate(object[property])) {
      objectCopy[property] = new Date(value);
    }
  }

  return objectCopy;
};

export const isvalidUUID = (id: string): boolean => {
  const validUuidPattern =
    "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";
  const regex = new RegExp(validUuidPattern);

  return regex.test(id);
};
