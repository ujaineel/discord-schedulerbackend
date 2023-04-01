export const correctDateValues = (
  object: Record<string, unknown>
): Record<any, unknown> => {
  const objectCopy = { ...object };

  let property;
  for (property in object) {
    const value = object[property];
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
      objectCopy[property] = new Date(value);
    }
  }

  return objectCopy;
};

export const isvalidUUID = (id: any): boolean => {
  if (typeof id !== "string") {
    return false;
  }

  const validUuidPattern =
    "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";
  const regex = new RegExp(validUuidPattern);

  return regex.test(id);
};

export const isEmail = (email: any): boolean => {
  if (typeof email !== "string") {
    return false;
  }

  // eslint-disable-next-line no-useless-escape
  const validEmailPattern =
    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])).){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])";

  const regex = new RegExp(validEmailPattern);

  return regex.test(email);
};
