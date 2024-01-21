import Ajv from 'ajv/dist/2020'
import addFormats from "ajv-formats"

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);

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