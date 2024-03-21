// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";
// Model Imports
import taskSchema, { ITask } from "./task.model";

// Interface
export interface IDrawingStage extends Document {
	drawingName: string;
	drawingStage: string;
	drawingDetails: string
	drawingDescription: string;
	drawingTask: ITask[];
	drawingProjectId: { projectId: string };
}

// drawing Stage Schema Class
const drawingStageSchema: Schema<IDrawingStage> = new mongoose.Schema({
	drawingName: {
		type: String,
		index: true,
		unique: true
	},
	drawingStage: {
		type: String,
		index: true,
	},
	drawingDetails: {
		type: String,
		index: true,
	},
	drawingDescription: {
		type: String,
		index: true,
	},
	drawingTask: [taskSchema],
	drawingProjectId: { projectId: String },
}, {timestamps: true});

// Model Creation
const drawingStageModel: Model<IDrawingStage> = mongoose.model("drawingStage", drawingStageSchema);

// Exporting Model
export default drawingStageModel;