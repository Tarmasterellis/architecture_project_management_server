import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";


export const ErrorMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
	error.statusCode = error.statusCode || 500;
	error.message = error.message || 'Internal Server Error, Please Contact Admin for Resolution...!';

	// Wrong MongoDB id error
	if(error.name == 'CastError') {
		const message = `Resource you are looking for is not found, due to : ${error.path}`;
		error = new ErrorHandler(message, 400);
	}

	// Duplicate Key Error
	if(error.code == 11000) {
		const message = `Duplicate ${Object.keys(error.keyValue)} entered...!`;
		error = new ErrorHandler(message, 400);
	}

	// // Wrong Json Web Token
	// if(error.name == 'JsonWebTokenError') {
	// 	const message = `Are you sure you are an authorized person...?`;
	// 	error = new ErrorHandler(message, 400);
	// }

	// // Expired Json Web Token
	// if(error.name == 'TokenExipredError') {
	// 	const message = `Login Again please, your token expired...!`;
	// 	error = new ErrorHandler(message, 400);
	// }

	response.status(error.statusCode).json({
		success: false,
		message: error.message
	});
}