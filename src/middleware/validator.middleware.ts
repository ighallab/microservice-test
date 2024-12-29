import { Request, Response, NextFunction} from "express";
import schemas from "../validator/validation.schema";
import {CustomError, JoiError, ValidationError} from "../validator/interfaces";


const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const requestValidator: any = (path: string, useJoiError = true): any => {
    const schema = schemas[path];
    if (!schema) {
        throw new Error(`Schema not found for path: ${path}`);
    }

    return (req:Request, res:Response, next:NextFunction): any => {
        const { error, value } = schema.validate(req.body, validationOptions);
        if (error) {
            const customError: CustomError = {
                status: "failed",
                error: "Invalid request. Please review request and try again.",
            };
            const joiError: JoiError = {
                status: "failed",
                error: {
                    original: error._original,
                    details: error.details.map(({ message, type }: ValidationError): ValidationError => ({
                        message: message.replace(/['"]/g, ""),
                        type,
                    })),
                },
            };
            return res.status(422).json(useJoiError ? joiError : customError);
        }

        // validation successful
        req.body = value;
        return next();
    };
};

export { requestValidator };