// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Models
import typeModel from "../../../models/projectModels/dependentModels/type.model";


// Get All Type
export const getAllTypeService = async (req: Request, res: Response, next: NextFunction ) => {
	const typeProjectId = req.body.user.userProjectId[0]?.projectId;
	const type = await typeModel.find({ typeProjectId }).sort({createdAt: -1});
	res.status(201).json({ success: true, type, });
}


// Get Type
export const getTypeService = async (req: Request, res: Response, next: NextFunction ) => {
	const { id } = req.params;
	const type = await typeModel.findById(id);
	res.status(201).json({ success: true, type, });
}


// Create Type
export const createTypeService = CatchAsyncError(async ( req: Request, res: Response, next: NextFunction ) => {
	const { projectType, typeDescription, typeProjectId } = req.body;

	const type = await typeModel.create({ projectType, typeDescription, typeProjectId });
	res.status(200).json({ success: true, type, });
});


// update Type
export const updateTypeService = async (req: Request, res: Response, next: NextFunction) => {
	const { projectType, typeDescription, typeProjectId } = req.body;
	const { id } = req.params;
	const type = await typeModel.findById(id);
	if(type?.typeProjectId === typeProjectId || req.body.user?.role === "admin" || "manager" || "lead")
	{
		const type = await typeModel.findByIdAndUpdate(id, { projectType, typeDescription }, { new: true });
		res.status(201).json({ success: true, type, });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
	next();
}


// Delete Type
export const deleteTypeService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const type = await typeModel.findById(id);

	if(!type) return next(new ErrorHandler("Oops, Category you are looking for is already deleted...!", 404));
	
	if(type?.typeProjectId === req.body.user?._id.toString() || req.body.user?.role === "admin")
	{
		await type.deleteOne({id});
		res.status(201).json({ success: true, message: "Category Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}