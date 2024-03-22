// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";


// Interface
export interface ITask extends Document {
	taskName: string;
	taskType: string;
	taskDetails: string;
	taskDescription: string;
	taskProjectId: { projectId: string };
	taskdrawingId: { drawingId: string };
}

// task Schema Class
const taskSchema: Schema<ITask> = new mongoose.Schema({
	taskName: {
		type: String,
		index: true,
		unique: true,
	},
	taskType: {
		type: String,
	},
	taskDetails: {
		type: String,
	},
	taskDescription: {
		type: String,
	},
	taskProjectId: { projectId: String },
	taskdrawingId: { drawingId: String },
}, {timestamps: true});

// Model Creation
const taskModel: Model<ITask> = mongoose.model("task", taskSchema);

// Exporting Model
export default taskModel;