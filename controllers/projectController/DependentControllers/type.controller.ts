// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Services
import { getAllTypeService, createTypeService, updateTypeService, deleteTypeService, getTypeService } from "../../../services/projectServices/DependentServices/type.service";


// Get All Types Of Project
export const getAllTypeOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllTypeService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Get One Type Of Project
export const getTypeOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getTypeService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Type of Project
export const createType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		createTypeService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Update Type of Project
export const updateType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateTypeService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Delete Type of Project
export const deleteType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		deleteTypeService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});