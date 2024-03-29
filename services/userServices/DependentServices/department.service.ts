// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Models
import departmentModel from "../../../models/userModels/DependentModels/department.model";
// Express
import { NextFunction, Response, Request } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";


// Get All Departments
export const getAllDepartmentService = async ( res: Response ) => {
	const departments = await departmentModel.find().sort({createdAt: -1});
	res.status(201).json({ success: true, departments, });
}


// Get Department by Id
export const getDepartmentByIdService = async (id: string, res: Response, next: NextFunction) => {

	const department = await departmentModel.findById(id);

	if(!department) return next(new ErrorHandler("Oops, Department you are looking for is already deleted...!", 404));

	res.status(201).json({ success: true, department });
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