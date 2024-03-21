// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";

// Interface
export interface IDepartment extends Document {
	departmentId: string;
	departmentName: string;
}

// Schema Class
const departmentSchema: Schema<IDepartment> = new mongoose.Schema({
	departmentName: {
		type: String,
		required: [true, "Please Enter Department Name...!"]
	},
}, {timestamps: true});

// Model Creation
const departmentModel: Model<IDepartment> = mongoose.model("department", departmentSchema);

// Exporting Model
export default departmentModel;