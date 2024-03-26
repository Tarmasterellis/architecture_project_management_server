// Error Handlers
import ErrorHandler from "../../../utils/ErrorHandler";
// Express
import { NextFunction, Request, Response } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../../../middleware/catchAsyncErrors";
// Models
import projectDetailsModel from "../../../models/projectModels/project.model";
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
	const { projectCategory, categoryDescription } = req.body;

	const category = await categoryModel.create({ projectCategory, categoryDescription });
	res.status(200).json({ success: true, category, });
});


// update Category
export const updateCategoryService = async (req: Request, res: Response, next: NextFunction) => {
	const { projectCategory, categoryDescription } = req.body;
	const { id } = req.params;
	const category = await categoryModel.findById(id);
	if(category)
	{
		const category = await categoryModel.findByIdAndUpdate(id, { projectCategory, categoryDescription }, { new: true });
		res.status(201).json({ success: true, category, });
	}
	else res.status(500).json({success: false, message: "Oops, The Category you are looking for doesn't exists...!"});
	next();
}


// Delete Category
export const deleteCategoryService = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;	
	const category = await categoryModel.findById(id);

	const projectCategoryCheck = await projectDetailsModel.find(category?._id).countDocuments();

	if(!category) return next(new ErrorHandler("Oops, Category you are looking for is already deleted...!", 404));
	if(projectCategoryCheck > 1) return next(new ErrorHandler("Category cannot be deleted as it is been used in another project too...!", 500));

	try
	{
		await category.deleteOne({id});
		res.status(201).json({ success: true, message: "Category Deleted Successfully...!" });
	}
	catch(error: any) { res.status(500).json({success: false, message: error.message}) };
}