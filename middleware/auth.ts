// .ENV File Import
require("dotenv").config();
// Json Web Token
import jwt, { JwtPayload } from "jsonwebtoken";
// Error Handlers
import ErrorHandler from "../utils/ErrorHandler";
// Middleware
import { CatchAsyncError } from "./catchAsyncErrors";
// Next JS
import { Response, Request, NextFunction } from "express";
// Access Token Refresh Import --Controller
import { updateAccessToken } from "../controllers/user.controller";
// Services
import { returnUserByIdService } from "../services/user.service";

// User Authentication
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if(!access_token) return new ErrorHandler("Please login to access this resource...!", 400);

    const decoded = jwt.decode(access_token) as JwtPayload;

    if(!decoded) return new ErrorHandler("Access Token is not valid...!", 400);

    // Check if Access Token is Expired
    if(decoded.exp && decoded.exp <= Date.now() / 1000)
    {
        try { await updateAccessToken(req, res, next); }
        catch(error) { return next(error); }
    }
    else
    {
        const user = await returnUserByIdService(decoded.id);

        if(!user) return new ErrorHandler("User Not Found, Are you sure it's really you...?", 400);

        req.body.user = user;

        next();
    }
});

// Validating user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) =>
    {
        if(!roles.includes(req.body.user?.role || '')) return new ErrorHandler(`Role: ${req.body.user?.role} is not allowed to access this resource`, 403);
        next();
    }
}