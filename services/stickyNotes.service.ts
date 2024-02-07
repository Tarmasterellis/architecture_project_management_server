// Express
import { NextFunction, Response } from "express";
// Error Handlers
import ErrorHandler from "../utils/ErrorHandler";
// Models
import stickyNotesModel from "../models/stickyNotes.model";
// Custom Async Error Middleware
import { CatchAsyncError } from "../middleware/catchAsyncErrors";


// Get All user
export const getAllStickyNotesService = async ( res: Response ) => {
    const stickyNotes = await stickyNotesModel.find().sort({createdAt: -1});
    res.status(201).json({ success: true, stickyNotes, });
}


// Create Department
export const createStickyNotesService = CatchAsyncError(async ( data: any, res: Response ) => {
	const stickyNote = await stickyNotesModel.create(data)
	res.status(200).json({ success: true, stickyNote, });
});


// update Department
export const updateStickyNotesService = async (id: string, noteTitle: string, noteText: string, res: Response) => {
    const stickyNote = await stickyNotesModel.findByIdAndUpdate(id, { noteTitle, noteText }, { new: true });
    res.status(201).json({ success: true, stickyNote, });
}


// Delete Department
export const deleteStickyNotesService = async (id: string, res: Response, next: NextFunction) => {
	const stickyNote = await stickyNotesModel.findById(id);

	if(!stickyNote) return next(new ErrorHandler("Oops, Sticky Note you are looking for is already deleted...!", 404));

	await stickyNote.deleteOne({id});

	res.status(201).json({ success: true, message: "Sticky Note Deleted Successfully...!" });
}