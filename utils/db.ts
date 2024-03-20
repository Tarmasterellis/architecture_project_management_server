require("dotenv").config();

import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URL || '';

const connectDB = async () => {
	try
	{
		await mongoose.connect(dbUrl)
			.then((data: any) => { console.log(`Database Connected With : ${data.connection.host}`); })
			.catch((error) => { console.log(`Database Not Connected Because : ${error.message}`); });
	}
	catch (error: any)
	{
		console.log(error.stack);
		setTimeout(connectDB, 5000);
	}
};

export default connectDB;