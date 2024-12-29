import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
);

const authRegister: ObjectSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
    username: Joi.string().required(),
}).error(errors => {
    errors.forEach(error=>{
        //customize schema validation errors messages
        switch (error.code) {
            case 'string.pattern.base':
                error.message = `${error.path[0]} is incorrect should contain at least [one letter, one number, one special character]]`;
                break;
            case 'email.pattern.base':
                error.message = `${error.path[0]} Invalid email address`;
                break;
            case 'any.required':
                error.message = `${error.path[0]} Field is required`;
                break;
            case 'string.min':
                error.message = `${error.path[0]} Value should have at least ${error.local.limit} characters!`;
                break;
            case 'number.min':
                error.message = `${error.path[0]} Value should have at least ${error.local.limit} Number long!`;
                break;
            default:
                break
        }
    })
    return errors
});;

const authLogin: ObjectSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
}).error(errors => {
    errors.forEach(error=>{
        //customize schema validation errors messages
        switch (error.code) {
            case 'string.pattern.base':
                error.message = `${error.path[0]} is incorrect should contain at least [one letter, one number, one special character]]`;
                break;
            case 'email.pattern.base':
                error.message = `${error.path[0]} Invalid email address`;
                break;
            case 'any.required':
                error.message = `${error.path[0]} Field is required`;
                break;
            case 'string.min':
                error.message = `${error.path[0]} Value should have at least ${error.local.limit} characters!`;
                break;
            case 'number.min':
                error.message = `${error.path[0]} Value should have at least ${error.local.limit} Number long!`;
                break;
            default:
                break
        }
    })
    return errors
});

const calculatorRequest: ObjectSchema = Joi.object().keys({
    intA: Joi.number().required(),
    intB: Joi.number().required(),
});


export default {
    "login": authLogin,
    "register": authRegister,
    "calculator": calculatorRequest,
} as { [key: string]: ObjectSchema };