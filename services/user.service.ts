// EJS Import
import ejs from "ejs";
// Path Module
import path  from "path";
// Utilities
import sendMail from "../utils/sendMail";
// Error Handlers
import ErrorHandler from "../utils/ErrorHandler";
// JWT Imports
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
// Express
import { NextFunction, Response, Request } from "express";
// Custom Async Error Middleware
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
// JWT Token
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
// Models
import userModel, { IUser, IUserLoginRequest, IActivationRequest, IRegistrationBody, IActivationToken, IChangePassword } from "../models/users.model";


// Get All users -- Admin Access Only
export const getAllUserService = async ( res: Response ) => {
    const users = await userModel.find().sort({createdAt: -1});
    res.status(201).json({ success: true, users, });
}

// Get user by ID
export const getUserByIdService = CatchAsyncError(async (req: any, res: Response, next: NextFunction ) => {
    const userJson = req.body.user;
    if(userJson) res.status(201).json({ success: true, userJson, });
    else res.status(404).json({ success: false });
});


// Create User
export const createUsersService = CatchAsyncError(async ( data: IUser, res: Response ) => {
	const user = await userModel.create(data)
	res.status(200).json({ success: true, user, });
});


// update User
export const updateUserService = async (id: string, data: IUser, res: Response) => {
    const user = await userModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
};


// Delete User
export const deleteUserService = async (id: string, res: Response, next: NextFunction) => {
    const user = await userModel.findById(id);

    if(!user) return next(new ErrorHandler("Oops, User you are looking for is already deleted...!", 404));

    await user.deleteOne({id});

    res.status(201).json({ success: true, message: "User Deleted Successfully...!" });
};


// User Registration Service
export const userRegistrationService = async(req: Request, res: Response, next: NextFunction) => {

    const { data } = req.body;

    const isEmailExists = await userModel.findOne( { userEmail: data.userEmail } );

    if(isEmailExists) return next(new ErrorHandler("Email is Already been Taken...!", 400));

    const user: IRegistrationBody = data;

    const activationToken = createActivationTokenService(user);

    const activationCode = activationToken.activationCode;
    const dataReq = { user: data, activationCode };
    const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), dataReq);

    try
    {
        await sendMail({
            email: user.userEmail,
            subject: 'Account Activation Code',
            template: 'activation-mail.ejs',
            data: dataReq,
        });

        res.status(201).json({
            success: true,
            message: `Please check your email : ${user.userEmail}, to activate your account...!`,
            activationToken: activationToken.token,
        });
    }
    catch (error: any)
    {
        return next(new ErrorHandler(error.message, 400));
    }
}

// Login User Service
export const loginUserService = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try
    {
        const { userName, userPasswordHash } = req.body as unknown as IUserLoginRequest;

        if(!userName || !userPasswordHash) return next(new ErrorHandler("Please enter Email and Password...!", 400));

        const user = await userModel.findOne( { userName }).select("+userPasswordHash");

        if(!user) return next(new ErrorHandler("Invalid Email or Password, Please Try Again...!", 400));

        const isPasswordMatching = await user.comparePassword(userPasswordHash);

        if(!isPasswordMatching) return next(new ErrorHandler("Password you entered is Invalid, Please Try Again with a correct one...!", 400));

        sendToken(user, 200, res);
    }
    catch (error: any)
    {
        return next(new ErrorHandler(error.message, 400));
    }
});


// Logout User Service
export const logoutUserService = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try
    {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });

        res.status(200).json({ success: true, message: "Logged out successfully...!" })
    }
    catch (error: any)
    {
        return next(new ErrorHandler(error.message, 400));
    }
});


// Update Access Token
export const updateAccessTokenService = async (req: any, res: Response, next: NextFunction) => {
    try
    {
        const refresh_token = req.cookies.refresh_token as string;

        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;

        const message = `Could not refresh token, Please Try again...!`

        if(!decoded) return new ErrorHandler(message, 400);

        const session = res.get(decoded.id as string);

        if(!session) return new ErrorHandler("User Not Found, Are you sure it's really you...?", 400);

        const user = JSON.parse(session);

        const accessToken = jwt.sign({ id: user._id, user: user }, process.env.ACCESS_TOKEN as string, { expiresIn: "5m" });

        const refreshToken = jwt.sign({ id: user._id, user: user }, process.env.REFRESH_TOKEN as string, { expiresIn: "3d" });

        req.user = user;

        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);


        next();
    }
    catch (error)
    {
        
    }
};


// update user Role
export const updateUserRoleService = async (req: any, res: Response, next: NextFunction) => {
    try
    {
        const { id, role } = req.body;
        const isUserExists = await userModel.findById(id);

        if(isUserExists)
        {
            const id = isUserExists._id;
            const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
            res.status(201).json({ success: true, user, });
        }
        else res.status(400).json({ success: false, message: "User Not Found...!" });
        next();
    }
    catch(error: any)
    {
        return next(new ErrorHandler(error.message, 400));
    }
}


// User Activation Service
export const userActivationService = async(req: any, res: Response, next: NextFunction) => {

    const { activation_token, activation_code } = req.body as IActivationRequest;

        const newUser: { user: IUser; activationCode: string } = jwt.verify( activation_token, process.env.ACTIVATION_SECRET as string ) as { user: IUser; activationCode: string }

        if(newUser.activationCode !== activation_code) return next(new ErrorHandler("Invalid Activation Code, Please Try Again...!", 400));

        const { userName, userEmail, userPasswordHash } = newUser.user;

        const userExists = await userModel.findOne({userEmail});

        if(userExists) return next(new ErrorHandler("Email already taken, Please Try Again with a different email address...!", 400));

        const user = await userModel.create({ userName, userEmail, userPasswordHash });

        res.status(201).json({
            success: true,
        })
}


// Create Activation Token Service
export const createActivationTokenService = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({
        user, activationCode
    }, process.env.ACTIVATION_SECRET as Secret, {
        expiresIn: "5m"
    });

    return { token, activationCode };
}


// User Change Password Service
export const changePasswordService = async (req: any, res: Response, next: NextFunction) => {

    console.log(req.body);
    const { id, oldPassword, newPassword } = req.body as IChangePassword;

    if(!oldPassword || !newPassword) return next(new ErrorHandler("Please enter your old and new password...!", 400));

    const user = await userModel.findById(id).select("+userPasswordHash");

    if(user?.userPasswordHash === undefined) return next(new ErrorHandler("Invalid user, Please contact admin if this is mistake...!", 400));

    const isPasswordMatch = await user?.comparePassword(oldPassword);

    if(!isPasswordMatch) return next(new ErrorHandler("Your Old Password is not Valid to change it to new one...!", 400));

    user.userPasswordHash = newPassword;

    await user.save();

    res.status(201).json({ success: true, user, });
}


// Return User Service for IsAuthentication
export const returnUserByIdService = async(id: string) => {
    const user = await userModel.findById(id);
    return user;
};