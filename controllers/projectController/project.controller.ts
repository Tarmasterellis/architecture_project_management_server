// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
// Services
import { getAllProjectService, createProjectService, updateProjectService, deleteProjectService, getProjectService } from "../../services/projectServices/project.service";


// Get All Projects Of User
export const getAllProjectsOfUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllProjectService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Get One Project Of User
export const getProjectOfUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getProjectService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Project of User
export const createProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		createProjectService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Update Project of User
export const updateProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateProjectService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Delete Project of User
export const deleteProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		deleteProjectService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});