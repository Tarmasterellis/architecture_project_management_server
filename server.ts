// Env File
require("dotenv").config();
// App Module Import
import { app } from "./app";
import connectDB from "./utils/db";

app.listen(process.env.PORT, () => {
	console.log(`Server is Connected to Port ${ process.env.PORT }`);
	connectDB();
});