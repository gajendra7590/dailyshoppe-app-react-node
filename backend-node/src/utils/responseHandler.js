
//IN SUCCESS CASE
export const resultCode200 = (res, message = null, data = null, extraParams = null) => {
    const statusCode = 200;
    let payload = {
        success: true,
        statusCode: statusCode,
        message: message ?? 'Success',
        data: data ?? []
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}

//IN BAD REQUEST | VALIDATION FAILED
export const resultCode400 = (res, message = null, error = null, extraParams = null) => {
    const statusCode = 400;
    let payload = {
        success: false,
        statusCode: statusCode,
        message: message ?? 'Bad Request',
        error: error ?? "Bad Request"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}

//Missing Token / UnAuthorised Token
export const resultCode401 = (res, message = null, error = null, extraParams = null) => {
    const statusCode = 401;
    let payload = {
        success: false,
        statusCode: statusCode,
        message: message ?? '401 Unauthorized',
        error: error ?? "401 Unauthorized"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}

//Role Misalignment
export const resultCode403 = (res, message = null, error = null, extraParams = null) => {
    const statusCode = 403;
    let payload = {
        success: false,
        statusCode: statusCode,
        message: message ?? '403 Forbidden',
        error: error ?? "403 Forbidden"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}

//NOT FOUND
export const resultCode404 = (res, message = null, error = null, extraParams = null) => {
    const statusCode = 404;
    let payload = {
        success: false,
        statusCode: statusCode,
        message: message ?? '404 Not Found',
        error: error ?? "404 Not Found"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}

//TOO MANY REQUEST
export const resultCode429 = (res, message = null, error = null, extraParams = null) => {
    const statusCode = 429;
    let payload = {
        success: false,
        statusCode: statusCode,
        message: message ?? '429 Internal Server Error',
        error: error ?? "429 Internal Server Error"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}

//SERVER ERROR
export const resultCode500 = (res, message = null, error = null, extraParams = null) => {
    const statusCode = 500;
    let payload = {
        success: false,
        statusCode: statusCode,
        message: message ?? '500 Internal Server Error',
        error: error ?? "500 Internal Server Error"
    }
    if (extraParams) {
        payload = { ...payload, extraParams };
    }
    return res.status(statusCode).json(payload);
}
