import { asyncHandler } from "../utility/asyncHedler.js";
import { errorHandler } from "../utility/errorHendler.js";
import jwt from "jsonwebtoken";

export const authMiddleware = asyncHandler((req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new errorHandler("Not authorized, no token", 401));
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = tokenData;
    next();
});