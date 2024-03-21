// .ENV File Import
require("dotenv").config();
// Encryption of Password
import bcrypt from "bcryptjs";
var crypto = require('crypto');
// JWT Token
import jwt from "jsonwebtoken";
// Unique Validator Check of Mongoose
var uniqueValidator = require('mongoose-unique-validator');
// Mongoose Import
import mongoose, { Document, Schema, Model } from "mongoose";

// Regex to check passwords
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegexPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// User Login Interface
export interface IUserLoginRequest {
	userName: string;
	userPasswordHash: string;
}

// Activation of User Interface
export interface IActivationRequest {
	activation_token: string;
	activation_code: string;
}


// Registration of User Interface
export interface IRegistrationBody {
	userFullName: string;
	userDOB?: Date;
	userDOJ?: Date;
	role: string;
	userName: string;
	userEmail: string;
	userPasswordHash: string;
	userSalt: string;
	userProfilePhoto?: string;
	isVerified: boolean;
}


// Activation Token Generation Interface
export interface IActivationToken {
	token: string;
	activationCode: string;
}


// Update User Password Interface
export interface IChangePassword {
	id: string;
	oldPassword: string;
	newPassword: string;
}


// User Interface
export interface IUser extends Document {
	userFullName: string;
	userDOB: Date;
	userDOJ: Date;
	role: string;
	userName: string;
	userEmail: string;
	userPasswordHash: string;
	userSalt: string;
	userProfilePhoto: string;
	isVerified: boolean;
	userDepartmentId: {departmentId: string};
	userStickyNotes: Array<{stickyNoteId: string}>;
	comparePassword: (userPasswordHash: string) => Promise<boolean>;
	SignInAccessToken: () => string;
	SignInRefreshToken: () => string;
}

// Schema Class
const userSchema: Schema<IUser> = new mongoose.Schema({
	userFullName: {
		type: String,
		index: true,
	},
	userDOB: {
		type: Date,
	},
	userDOJ: {
		type: Date,
	},
	role: {
		type: String,
		default: "user",
		index: true
	},
	userName: {
		type: String,
		index: { unique: true },
		required: [true, "Please Enter Your Username...!"]
	},
	userEmail: {
		type: String,
		required: [true, "Please Enter your Email Address...!"],
		validate: {
			validator: function(value: string)
			{
				return emailRegexPattern.test(value)
			},
			message: "Please Enter A Valid Email Address...!",
		},
		unique: true
	},
	userPasswordHash: {
		type: String,
		minlength: [8, "A valid Password Contains Minimum eight characters...!"],
		validate: {
			validator: function(value: string)
			{
				return passwordRegexPattern.test(value)
			},
			message: "Please Enter A Valid Password...!\nA valid Password Contains\n\nMinimum eight characters\nAt least one uppercase letter\nOne lowercase letter\nOne number\nOne special character",
		},
		select: false,
	},
	userSalt: {
		type: String
	},
	userProfilePhoto: {
		type: String
	},
	isVerified : {
		type: Boolean,
		default: false
	},
	userDepartmentId: {departmentId: String},
	userStickyNotes: [{stickyNoteId: String}]
}, {timestamps: true});

// Hashing Password before saving
userSchema.pre<IUser>('save', async function(next) {
	if(!this.isModified('userPasswordHash')) next();
	this.userPasswordHash = await bcrypt.hash(this.userPasswordHash, 10);
	this.userSalt = await crypto.randomBytes(16).toString('hex');
	next();
});

// Sign-In Access Token
userSchema.methods.SignInAccessToken = function () { return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', { expiresIn: "5m" }); }

// Sign-In Refresh Token
userSchema.methods.SignInRefreshToken = function () { return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', { expiresIn: "3d" }); }

userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> { return await bcrypt.compare(enteredPassword, this.userPasswordHash); };

// Model Creation
const userModel: Model<IUser> = mongoose.model("user", userSchema);

// Exporting Model
export default userModel;