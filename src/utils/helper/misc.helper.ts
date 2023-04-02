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
  const validEmailPattern: RegExp =
    // Mistaken lint error
    // eslint-disable-next-line no-useless-escape
    /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  return validEmailPattern.test(email);
};
