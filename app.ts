// Env File
require("dotenv").config();
// Cors
import cors from "cors";
// Path Import
const path = require("path")
// Cookies
import cookieParser from "cookie-parser";
// Middleware
import { ErrorMiddleware } from './middleware/error';
// Routes
import userRouter from "./routes/userRoutes/user.route";
import stickyNoteRouter from "./routes/stickyNoteRoutes/stickyNotes.route";
import typeRouter from "./routes/projectRoutes/DependentRoutes/type.route";
import taskRouter from "./routes/projectRoutes/DependentRoutes/task.route";
import categoryRouter from "./routes/projectRoutes/DependentRoutes/category.route";
import departmentRouter from "./routes/userRoutes/DependentRoutes/department.route";
import drawingStageRouter from "./routes/projectRoutes/DependentRoutes/drawingStage.route";
// Express
import { rateLimit } from 'express-rate-limit';
import express, { Request, Response, NextFunction } from "express";


export const app = express();

// Body Parses
app.use(express.json({ limit: "50mb" }));

// Cookie Parses
app.use(cookieParser());

// cors => Cross Origin Resource Sharing
app.use(cors({
	origin: process.env.ORIGIN,
	credentials: true,
}));

// Use Bootstrap
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use( "/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use( "/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))

// API Requests Limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});

// Routes
app.use("/api/v1", userRouter, departmentRouter, stickyNoteRouter, categoryRouter, typeRouter, drawingStageRouter, taskRouter);
// app.use("/api/v1", stickyNoteRouter);

// test API
app.get("/test", (req: Request, res:Response, next:NextFunction) => {
	res.status(200).json({
		success: true,
		message: "Working API Created...!"
	});
});


// Unknown Route
app.get("*", (req: Request, res:Response, next:NextFunction) => {
	const error = new Error(`Route ${req.originalUrl} not found...!`) as any;
	error.statusCode = 404;
	next(error);
});

// Using the limiter in API's
app.use(limiter);

// MiddleWare
app.use(ErrorMiddleware);