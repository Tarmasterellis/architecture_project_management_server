// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";
// Models Import
import typeSchema, { IType } from './dependentModels/type.model';
import taskSchema, { ITask } from './dependentModels/task.model';
import categorySchema, { ICategory } from './dependentModels/categories.model';
import drawingStageSchema, { IDrawingStage } from './dependentModels/drawing.model';


// Project Details Interface
export interface IProjectDetail extends Document {
	projectName: string;
	projectStartDate: Date;
	projectEndDate: Date;
	projectStatus: string;
	projectCategory: {type: Schema.Types.ObjectId, ref: "categories"};
	projectTypeId: {type: Schema.Types.ObjectId, ref: "types"};
	projectDrawingStageId: [{type: Schema.Types.ObjectId, ref: "drawingstages"}];
	projectTaskId: [{type: Schema.Types.ObjectId, ref: "tasks"}];
	projectUserId: [{type: Schema.Types.ObjectId, ref: "users"}];
}


// Project Details Schema Class
const projectDetailSchema: Schema<IProjectDetail> = new mongoose.Schema({
	projectName: {
		type: String,
		index: true,
		unique: true,
		required: [true, "Project Name is required...!"],
	},
	projectStartDate: {
		type: Date,
		index: true,
		required: [true, "Project Start Date is required...!"],
	},
	projectEndDate: {
		type: Date,
		index: true,
		required: [true, "Project End Date is required...!"],
	},
	projectStatus: {
		type: String,
		index: true,
	},
	projectCategory: {type: Schema.Types.ObjectId, ref: "categories"},
	projectTypeId: {type: Schema.Types.ObjectId, ref: "types"},
	projectDrawingStageId: [{type: Schema.Types.ObjectId, ref: "drawingstages"}],
	projectTaskId: [{type: Schema.Types.ObjectId, ref: "tasks"}],
	projectUserId: [{type: Schema.Types.ObjectId, ref: "users"}],
}, {timestamps: true});

// Model Creation
const projectDetailModel: Model<IProjectDetail> = mongoose.model("projectDetail", projectDetailSchema);

// Exporting Model
export default projectDetailModel;