// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Models
import taskModel from "../../../models/projectModels/dependentModels/task.model";


// Get All Task
export const getAllTaskService = async (req: Request, res: Response, next: NextFunction ) => {
	const taskProjectId = req.body.user.userProjectId[0]?.projectId;
	const task = await taskModel.find({ taskProjectId }).sort({createdAt: -1});
	res.status(201).json({ success: true, task, });
}


// Get Task
export const getTaskService = async (req: Request, res: Response, next: NextFunction ) => {
	const { id } = req.params;
	const task = await taskModel.findById(id);
	res.status(201).json({ success: true, task, });
}


// Create Task
export const createTaskService = CatchAsyncError(async ( req: Request, res: Response, next: NextFunction ) => {
	const { taskName, taskType, taskDetails, taskDescription } = req.body;

	const task = await taskModel.create({ taskName, taskType, taskDetails, taskDescription });
	res.status(200).json({ success: true, task, });
});


// update Task
export const updateTaskService = async (req: Request, res: Response, next: NextFunction) => {
	const { taskName, taskType, taskDetails, taskDescription } = req.body;
	const { id } = req.params;
	if(req.body.user?.role === "admin" || "manager" || "lead")
	{
		const task = await taskModel.findByIdAndUpdate(id, { taskName, taskType, taskDetails, taskDescription }, { new: true });
		res.status(201).json({ success: true, task, });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
	next();
}


// Delete Task
export const deleteTaskService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const task = await taskModel.findById(id);

	if(!task) return next(new ErrorHandler("Oops, Task you are looking for is already deleted...!", 404));
	
	if(req.body.user?.role === "admin")
	{
		await task.deleteOne({id});
		res.status(201).json({ success: true, message: "Task Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}