// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Services
import { getAllTaskService, createTaskService, updateTaskService, deleteTaskService, getTaskService } from "../../../services/projectServices/DependentServices/task.service";


// Get All Task Of Project
export const getAllTaskOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllTaskService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Get One Task Of Project
export const getTaskOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getTaskService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Task of Project
export const createTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		createTaskService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Update Task of Project
export const updateTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateTaskService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Delete Task of Project
export const deleteTask = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		deleteTaskService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});