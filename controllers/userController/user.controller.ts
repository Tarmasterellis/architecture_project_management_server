// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
// Services
import { createUsersService, updateUserService, deleteUserService, loginUserService, logoutUserService, updateAccessTokenService, getUserByIdService, getAllUserService, updateUserRoleService, userActivationService, createActivationTokenService, userRegistrationService, changePasswordService } from "../../services/userServices/user.service";


// Get User Information
export const getUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getUserByIdService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// Get All Users --- Admin Access Only
export const getAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try { getAllUserService(res); }
	catch (error: any) { return next(new ErrorHandler(error.message, 400)); }
});


// Create User
export const createUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const data = req.body;
		createUsersService(data, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Update User
export const updateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const { id, data } = req.body;
		updateUserService(id, data, res);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Delete User
export const deleteUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		const { id } = req.params;
		deleteUserService(id, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// Registration of User
export const userRegistration = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		userRegistrationService(req, res, next)
	}
	catch(error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// User Login
export const userLogin = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		loginUserService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// User Logout
export const userLogout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		logoutUserService(req.body, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// Update Access Token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateAccessTokenService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// Update User Roles --- Admin Access Only
export const updateUserRole = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateUserRoleService(req, res, next)
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});


// Activation of User
export const userActivation = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		userActivationService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});



// Update User Password
export const changePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		changePasswordService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});