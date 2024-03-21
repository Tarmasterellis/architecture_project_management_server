// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Services
import { getAllDepartmentService, createDepartmentService, updateDepartmentNameService, deleteDepartmentService, getDepartmentByIdService } from "../../../services/userServices/DependentServices/department.service";


// Get All Departments
export const getAllDepartments = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllDepartmentService(res);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Get Department by ID
export const getDepartmentById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const { id } = req.params;
		getDepartmentByIdService(id, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Department
export const createDepartment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const data = req.body;
		createDepartmentService(data, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Update Department
export const updateDepartment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const { departmentId, departmentName } = req.body;
		updateDepartmentNameService(departmentId, departmentName, res);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Delete Department
export const deleteDepartment = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const { id } = req.params;
		deleteDepartmentService(id, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});