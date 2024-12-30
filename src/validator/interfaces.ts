interface ValidationError {
    message: string;
    type?: string;
}

interface JoiError {
    status: string;
    error: {
        original: unknown;
        details: ValidationError[];
    };
}

interface CustomError {
    status: string;
    error: string;
}

export {JoiError, CustomError, ValidationError}