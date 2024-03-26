// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Models
import drawingModel from "../../../models/projectModels/dependentModels/drawing.model";


// Get All Drawing Stage
export const getAllDrawingStageService = async (req: Request, res: Response, next: NextFunction ) => {
	console.log(req.body.user.userProjectId[0]?.projectId);
	const drawingProjectId = req.body.user.userProjectId[0]?.projectId;
	const drawingStage = await drawingModel.find({ drawingProjectId }).sort({createdAt: -1});
	res.status(201).json({ success: true, drawingStage, });
}


// Get Drawing Stage
export const getDrawingStageService = async (req: Request, res: Response, next: NextFunction ) => {
	const { id } = req.params;
	const drawingStage = await drawingModel.findById(id);
	res.status(201).json({ success: true, drawingStage, });
}


// Create Drawing Stage
export const createDrawingStageService = CatchAsyncError(async ( req: Request, res: Response, next: NextFunction ) => {
	const { drawingName, drawingStage, drawingDetails, drawingDescription, drawingTaskId } = req.body;

	const drawingStages = await drawingModel.create({ drawingName, drawingStage, drawingDetails, drawingDescription, drawingTaskId });
	res.status(200).json({ success: true, drawingStages, });
});


// update Drawing Stage
export const updateDrawingStageService = async (req: Request, res: Response, next: NextFunction) => {
	const { drawingName, drawingStage, drawingDetails, drawingDescription, drawingTaskId } = req.body;
	const { id } = req.params;
	const drawingStages = await drawingModel.findById(id);
	if(drawingStages?.drawingTaskId === drawingTaskId || req.body.user?.role === "admin" || "manager" || "lead")
	{
		const drawingStages = await drawingModel.findByIdAndUpdate(id, { drawingName, drawingStage, drawingDetails, drawingDescription }, { new: true });
		res.status(201).json({ success: true, drawingStages, });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
	next();
}


// Delete Drawing Stage
export const deleteDrawingStageService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const drawingStage = await drawingModel.findById(id);

	if(!drawingStage) return next(new ErrorHandler("Oops, Drawing Stage you are looking for is already deleted...!", 404));
	
	if(req.body.user?.role === "admin")
	{
		await drawingStage.deleteOne({id});
		res.status(201).json({ success: true, message: "Drawing Stage Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}