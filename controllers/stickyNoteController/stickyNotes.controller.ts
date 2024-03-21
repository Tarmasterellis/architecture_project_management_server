// .ENV File Import
require("dotenv").config();
// Error Handlers
import ErrorHandler from "../../utils/ErrorHandler";
// Next JS
import { Response, Request, NextFunction } from "express";
// Middleware
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
// Services
import { getAllStickyNotesService, createStickyNotesService, updateStickyNotesService, deleteStickyNotesService, getStickyNoteService } from "../../services/stickyNoteServices/stickyNotes.service";


// Get All Sticky Notes Of User
export const getAllStickyNotesOfUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getAllStickyNotesService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Get One Sticky Note Of User
export const getStickyNoteOfUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		getStickyNoteService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});

// Create Sticky Note of User
export const createStickyNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		createStickyNotesService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Update Sticky Note of User
export const updateStickyNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		updateStickyNotesService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 500));
	}
});


// Delete Sticky Note of User
export const deleteStickyNote = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
	try
	{
		deleteStickyNotesService(req, res, next);
	}
	catch (error: any)
	{
		return next(new ErrorHandler(error.message, 400));
	}
});