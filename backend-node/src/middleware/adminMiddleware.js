import { resultCode403 } from '../utils/responseHandler.js';

export const checkAdminRole = (req, res, next) => {
    if (req.user && req.user?.role?.name === "admin") {
        next();
    } else {
        return resultCode403(res, "Sorry! You are not authorised to get access.");
    }
};