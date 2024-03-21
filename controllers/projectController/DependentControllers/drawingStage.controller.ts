// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Services
import { getAllDrawingStageService, createDrawingStageService, updateDrawingStageService, deleteDrawingStageService, getDrawingStageService } from "../../../services/projectServices/DependentServices/drawingStage.service";


// Get All Drawing Stage Of Project
export const getAllDrawingStageOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllDrawingStageService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Get One Drawing Stage of Project
export const getDrawingStageOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getDrawingStageService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Drawing Stage of Project
export const createDrawingStage = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		createDrawingStageService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Update Drawing Stage of Project
export const updateDrawingStage = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateDrawingStageService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Delete Drawing Stage of Project
export const deleteDrawingStage = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		deleteDrawingStageService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});