import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export const validatorFactory = (schema) => {
  const validate = ajv.compile(schema);

  const verify = (data) => {
    const isValid = validate(data);
    if (isValid) {
      return data;
    }
    return {
      message: "Validation Error",
      errors: validate.errors,
    }
  };

  return { schema, verify };
};