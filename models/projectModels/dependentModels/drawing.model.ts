// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";

// Interface
export interface IDrawingStage extends Document {
	drawingName: string;
	drawingStage: string;
	drawingDetails: string;
	drawingDescription: string;
	drawingTaskId: [{ taskId: string }];
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
	drawingTaskId: [{ taskId: String }],
	drawingProjectId: { projectId: String },
}, {timestamps: true});

// Model Creation
const drawingStageModel: Model<IDrawingStage> = mongoose.model("drawingStage", drawingStageSchema);

// Exporting Model
export default drawingStageModel;