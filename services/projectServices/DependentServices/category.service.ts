// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Models
import categoryModel from "../../../models/projectModels/dependentModels/categories.model";


// Get All Category
export const getAllCategoryService = async (req: Request, res: Response, next: NextFunction ) => {
	const categoryProjectId = req.body.user.userProjectId[0]?.projectId;
	const category = await categoryModel.find({ categoryProjectId }).sort({createdAt: -1});
	res.status(201).json({ success: true, category, });
}


// Get Category
export const getCategoryService = async (req: Request, res: Response, next: NextFunction ) => {
	const { id } = req.params;
	const category = await categoryModel.findById(id);
	res.status(201).json({ success: true, category, });
}


// Create Category
export const createCategoryService = CatchAsyncError(async ( req: Request, res: Response, next: NextFunction ) => {
	const { projectCategory, categoryDescription, categoryProjectId } = req.body;

	const category = await categoryModel.create({ projectCategory, categoryDescription, categoryProjectId });
	res.status(200).json({ success: true, category, });
});


// update Category
export const updateCategoryService = async (req: Request, res: Response, next: NextFunction) => {
	const { projectCategory, categoryDescription, categoryProjectId } = req.body;
	const { id } = req.params;
	const category = await categoryModel.findById(id);
	if(category?.categoryProjectId === categoryProjectId || req.body.user?.role === "admin" || "manager" || "lead")
	{
		const category = await categoryModel.findByIdAndUpdate(id, { projectCategory, categoryDescription }, { new: true });
		res.status(201).json({ success: true, category, });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
	next();
}


// Delete Category
export const deleteCategoryService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const category = await categoryModel.findById(id);

	if(!category) return next(new ErrorHandler("Oops, Category you are looking for is already deleted...!", 404));
	
	if(category?.categoryProjectId === req.body.user?._id.toString() || req.body.user?.role === "admin")
	{
		await category.deleteOne({id});
		res.status(201).json({ success: true, message: "Category Deleted Successfully...!" });
	}
	else res.status(400).json({success: false, message: "You are not Authorized to access this area, if this is a mistake, Please Contact admin for solution...!"});
}