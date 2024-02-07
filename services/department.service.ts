// Express
import { NextFunction, Response } from "express";
// Error Handlers
import ErrorHandler from "../utils/ErrorHandler";
// Models
import departmentModel from "../models/department.model";
// Custom Async Error Middleware
import { CatchAsyncError } from "../middleware/catchAsyncErrors";


// Get All user
export const getAllDepartmentService = async ( res: Response ) => {
    const departments = await departmentModel.find().sort({createdAt: -1});
    res.status(201).json({ success: true, departments, });
}


// Create Department
export const createDepartmentService = CatchAsyncError(async ( data: any, res: Response ) => {
	const department = await departmentModel.create(data)
	res.status(200).json({ success: true, department, });
});


// update Department
export const updateDepartmentNameService = async (id: string, departmentName: string, res: Response) => {
    const department = await departmentModel.findByIdAndUpdate(id, { departmentName }, { new: true });
    res.status(201).json({ success: true, department, });
}


// Delete Department
export const deleteDepartmentService = async (id: string, res: Response, next: NextFunction) => {
	const department = await departmentModel.findById(id);

	if(!department) return next(new ErrorHandler("Oops, Department you are looking for is already deleted...!", 404));

	await department.deleteOne({id});

	res.status(201).json({ success: true, message: "Department Deleted Successfully...!" });
}