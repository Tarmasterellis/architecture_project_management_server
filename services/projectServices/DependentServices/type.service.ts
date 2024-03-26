// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Models
import projectDetailModel from "../../../models/projectModels/project.model";
import typeModel from "../../../models/projectModels/dependentModels/type.model";


// Get All Type
export const getAllTypeService = async (req: Request, res: Response, next: NextFunction ) => {
	const typeProjectId = req.body.user.userProjectId[0]?.projectId;
	const findProject = await projectDetailModel.findOne({ typeProjectId });

	if(!findProject) return res.status(400).json({success: false, message: "Project you are looking for isn't with us, if this is a mistake, Please Contact admin for solution...!"});

	const type = await typeModel.find(findProject.projectTypeId).sort({createdAt: -1});
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
	const { projectType, typeDescription } = req.body;

	const type = await typeModel.create({ projectType, typeDescription });
	res.status(200).json({ success: true, type, });
});


// update Type
export const updateTypeService = async (req: Request, res: Response, next: NextFunction) => {
	const { projectType, typeDescription } = req.body;
	const { id } = req.params;
	if(req.body.user?.role === "admin" || "manager" || "lead")
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

	if(!type) return next(new ErrorHandler("Oops, Type you are looking for is already deleted...!", 404));
	
	if(req.body.user?.role === "admin")
	{
		await type.deleteOne({id});
		res.status(201).json({ success: true, message: "Type Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}