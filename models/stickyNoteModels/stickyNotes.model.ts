// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";

// Interface
export interface IStickyNotes extends Document {
	noteTitle: string;
	noteText: string;
	userId: { type: Schema.Types.ObjectId, ref: "users" };
}

// Schema Class
const stickyNotesSchema: Schema<IStickyNotes> = new mongoose.Schema({
	noteTitle: {
		type: String,
	},
	noteText: {
		type: String,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
		required: [true, "Missing Who does this sticky note belong to, I mean User ID is Missing...!"]
	},
}, {timestamps: true});

// Model Creation
const stickyNotesModel: Model<IStickyNotes> = mongoose.model("stickyNotes", stickyNotesSchema);

// Exporting Model
export default stickyNotesModel;