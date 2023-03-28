const doc = {
  openapi: "3.0.3", // present supported openapi version
  basePath: "/",
  info: {
    title: "Discord Scheduler API", // short title.
    description: "A discord-based task scheduling API", //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "Jaineel Upadhyay", // your name
    },
  },
  servers: [
    {
      url: "http://localhost:8081/",
      description: "Local server",
    },
    {
      url: "https://api_url_testing",
      description: "Testing server",
    },
  ],
  tags: [
    {
      name: "Meta",
      description: "Misc. operations",
    },
    {
      name: "Tasks",
      description: "Operations related to Tasks",
    },
  ],
  definition: {
    Task: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        title: {
          type: "string",
        },
        content: {
          type: "string",
        },
        createdAt: {
          type: "datetime",
        },
        updatedAt: {
          type: "datetime",
        },
        deletedAt: {
          type: "datetime",
        },
        dueDate: {
          type: "datetime",
        },
        published: {
          type: "boolean",
        },
        userId: {
          type: "string",
        },
      },
      required: ["createdAt", "updatedAt", "title", "userId"],
    },
  },
};

export default doc;
