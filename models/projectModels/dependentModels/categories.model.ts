// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";


// Interface
export interface ICategory extends Document {
	projectCategory: string;
	categoryDescription: string;
	categoryProjectId: { projectId: string };
}

// Schema Class
const categorySchema: Schema<ICategory> = new mongoose.Schema({
	projectCategory: {
		type: String,
		index: true,
	},
	categoryDescription: {
		type: String,
		index: true,
	},
	categoryProjectId: { projectId: String },
}, {timestamps: true});

// Model Creation
const categoryModel: Model<ICategory> = mongoose.model("category", categorySchema);

// Exporting Model
export default categoryModel;