import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { resultCode401, resultCode500 } from '../utils/responseHandler.js';

export const tokenVeirfy = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            req.user = decoded;
            next();
        } else {
            return resultCode401(res, "You have been logged out, login again.");
        }
    } catch (error) {
        return resultCode401(res, "You have been logged out, login again.");
    }
};