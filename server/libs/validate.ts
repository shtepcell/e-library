import createHttpError from 'http-errors';

export const onValidateError = (req, res) => validationError => {
    const errors = {};

    Object.keys(validationError.errors).forEach(error => {
        errors[error] = validationError.errors[error].properties.message;
    });

    return onError(req, res)(createHttpError(422, validationError.message, errors));
}

export const onError = (req, res) => error => {
    const { status = 500, ...body } = error || {};

    console.error(body.message);
    return res.status(status).send(body);
}

export const errorHandler = (req, res, next) => controller =>{
    try {
        controller(req, res, next);
    } catch (error) {
        return onError(req, res)(error);
    }
}