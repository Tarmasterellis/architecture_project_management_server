// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";


// Interface
export interface IType extends Document {
	projectType: string;
	typeDescription: string;
}

// Schema Class
const typeSchema: Schema<IType> = new mongoose.Schema({
	projectType: {
		type: String,
		index: true,
	},
	typeDescription: {
		type: String,
		index: true,
	},
}, {timestamps: true});

// Model Creation
const typeModel: Model<IType> = mongoose.model("type", typeSchema);

// Exporting Model
export default typeModel;