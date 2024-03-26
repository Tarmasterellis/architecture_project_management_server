// Error Handlers
import ErrorHandler from "../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Services

// Custom Async Error Middleware
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
// Models
import userModel from "../../models/userModels/users.model";
import projectDetailModel, { IProjectDetail } from "../../models/projectModels/project.model";


// Get All Project of user
export const getAllProjectService = async (req: Request, res: Response, next: NextFunction ) => {
	const {userId} = req.body?.id;
	const projectDetails = await projectDetailModel.find({userId}).sort({createdAt: -1});
	res.status(201).json({ success: true, projectDetails, });
}


// Get Project of user
export const getProjectService = async (req: Request, res: Response, next: NextFunction ) => {
	const { id } = req.params;
	const projectDetails = await projectDetailModel.findById(id);
	res.status(201).json({ success: true, projectDetails, });
}


// Create Project
export const createProjectService = CatchAsyncError(async ( req: Request, res: Response, next: NextFunction ) => {
	const { data } = req.body;
	data.projectUserId = req.body.user?._id;

	if(data.projectStartDate <= data.projectEndDate && data.projectName !== '')
	{
		const projectDetails = await projectDetailModel.create(data);
		const projectUserEntry = await userModel.findByIdAndUpdate(req.body.user?._id, { userProjectId: projectDetails._id }, {new: true});

		if(projectUserEntry) res.status(200).json({ success: true, projectDetails, });
		else res.status(500).json({success: false, message: "Something went wrong on our End, Please Contact admin for solution...!"});
	}
	else res.status(500).json({success: false, message: "Project End date cannot be lesser than or equal to the start date, Please correct it...!"});
});


// update Project
export const updateProjectService = async (req: Request, res: Response, next: NextFunction) => {
		const { id, data } = req.body;
		const projectDetails = await projectDetailModel.findByIdAndUpdate(id, data);
		if(projectDetails?.projectUserId.toString() === req.body.user?._id.toString() || req.body.user?.role === "admin" || "manager" || "lead")
		{
			const projectDetails = await projectDetailModel.findByIdAndUpdate(id, data);
			res.status(201).json({ success: true, projectDetails, });
		}
		else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
		next();
}


// Delete Project
export const deleteProjectService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const projectDetails = await projectDetailModel.findById(id);

	if(!projectDetails) return next(new ErrorHandler("Oops, Project you are looking for is already deleted...!", 404));
	
	if(projectDetails?.projectUserId === req.body.user?._id.toString() || req.body.user?.role === "admin" || "manager" || "lead")
	{
		await projectDetails.deleteOne({id});
		res.status(201).json({ success: true, message: "Project Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}