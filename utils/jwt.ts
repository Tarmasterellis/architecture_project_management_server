// .ENV File Import
require("dotenv").config();
// Next JS
import { Response } from "express";
// Models
import { IUser } from "../models/userModels/users.model";

// Token Interface
interface ITokenOptions {
	expires: Date;
	maxAge: number;
	httpOnly: boolean;
	sameSite: 'lax' | 'strict' | 'none' | undefined;
	secure?: boolean
}


// Parse Environment variables to Integrates with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);


export const accessTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
	maxAge: accessTokenExpire * 60 * 60 * 1000,
	httpOnly: true,
	sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
	maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
	httpOnly: true,
	sameSite: "lax",
};


// Send Token
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
	const accessToken = user.SignInAccessToken();
	const refreshToken = user.SignInRefreshToken();

	if(process.env.NODE_ENV === 'production') accessTokenOptions.secure = true;

	res.cookie("access_token", accessToken, accessTokenOptions);
	res.cookie("refresh_token", refreshToken, refreshTokenOptions);

	res.status(statusCode).json({
		success: true,
		user,
		accessToken,
	})
}