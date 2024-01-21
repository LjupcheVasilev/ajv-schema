export const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    subject: {
      type: "string",
      enum: ["math", "english", "science"],
    },
    curriculum: {
      type: "string",
      enum: ["2024", "2023", "2022"],
    }
  },
  required: ["email"],
  dependentRequired: {
    subject: ["curriculum"],
  },
  additionalProperties: false,
};