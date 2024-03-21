// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Services
import { getAllCategoryService, createCategoryService, updateCategoryService, deleteCategoryService, getCategoryService } from "../../../services/projectServices/DependentServices/category.service";


// Get All Categories Of Project
export const getAllCategoryOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllCategoryService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Get One Category Of Project
export const getCategoryOfProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getCategoryService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Category of Project
export const createCategory = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		createCategoryService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Update Category of Project
export const updateCategory = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateCategoryService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Delete Category of Project
export const deleteCategory = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		deleteCategoryService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});