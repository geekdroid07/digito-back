import Joi, {StringSchema, ObjectSchema} from "@hapi/joi";
import Logger from "../../infrastructure/core/Logger";
import {BadRequestError} from "../../presentation/errors/ApiError";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export function JoiObjectId(): StringSchema {
  return Joi.string().custom((value: string, helpers) => {
    if (!value) return helpers.error("any.invalid");
    return value;
  }, "Object Id Validation");
}

export function JoiUrlEndpoint(): StringSchema {
  return Joi.string().custom((value: string, helpers) => {
    if (value.includes("://")) return helpers.error("any.invalid");
    return value;
  }, "Url Endpoint Validation");
}

export function JoiAuthBearer(): StringSchema {
  return Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith("Bearer ")) return helpers.error("any.invalid");
    if (!value.split(" ")[1]) return helpers.error("any.invalid");
    return value;
  }, "Authorization Header Validation");
}

export default function validator(
  schema: ObjectSchema,
  source: ValidationSource = ValidationSource.BODY,
) {
  return (req: Request, res: Response, next): void => {
    try {
      const {error} = schema.validate(req[source]);

      if (!error) return next();

      const {details} = error;
      const message = details
        .map((i: any) => i.message.replace(/['"]+/g, ""))
        .join(",");
      Logger.error(message);

      next(new BadRequestError(message));
    } catch (error) {
      next(error);
    }
  };
}
