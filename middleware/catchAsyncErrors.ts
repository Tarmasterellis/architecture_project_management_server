import { NextFunction, Request, Response } from "express";


export const CatchAsyncError = (TFunction: any) => (request: Request, response: Response, next: NextFunction) => { Promise.resolve(TFunction(request, response, next)).catch(next); };