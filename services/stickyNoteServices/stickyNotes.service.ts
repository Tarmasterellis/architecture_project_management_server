// Error Handlers
import ErrorHandler from "../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Services
import { updateUserService } from "../userServices/user.service";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
// Models
import stickyNotesModel, { IStickyNotes } from "../../models/stickyNoteModels/stickyNotes.model";


// Get All Stick Note of user
export const getAllStickyNotesService = async (req: Request, res: Response, next: NextFunction ) => {
	const userId = req.body.user?._id;
	const stickyNotes = await stickyNotesModel.find({ userId }).sort({createdAt: -1});
	res.status(201).json({ success: true, stickyNotes, });
}


// Get Stick Note of user
export const getStickyNoteService = async (req: Request, res: Response, next: NextFunction ) => {
	const { id } = req.params;
	const stickyNotes = await stickyNotesModel.findById(id);
	res.status(201).json({ success: true, stickyNotes, });
}


// Create StickyNote
export const createStickyNotesService = CatchAsyncError(async ( req: Request, res: Response, next: NextFunction ) => {
	const { noteTitle, noteText, userId } = req.body;

	const stickyNote = await stickyNotesModel.create({ noteTitle, noteText, userId });
	res.status(200).json({ success: true, stickyNote, });
});


// update StickyNote
export const updateStickyNotesService = async (req: Request, res: Response, next: NextFunction) => {
		const { id, noteTitle, noteText } = req.body;
		const stickyNotes = await stickyNotesModel.findById(id);
		if(stickyNotes?.userId === req.body.user?._id.toString() || req.body.user?.role === "admin")
		{
			const stickyNote = await stickyNotesModel.findByIdAndUpdate(id, { noteTitle, noteText }, { new: true });
			res.status(201).json({ success: true, stickyNote, });
		}
		else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
		next();
}


// Delete StickyNote
export const deleteStickyNotesService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const stickyNote = await stickyNotesModel.findById(id);

	if(!stickyNote) return next(new ErrorHandler("Oops, Sticky Note you are looking for is already deleted...!", 404));
	
	if(stickyNote?.userId === req.body.user?._id.toString() || req.body.user?.role === "admin")
	{
		await stickyNote.deleteOne({id});
		res.status(201).json({ success: true, message: "Sticky Note Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}