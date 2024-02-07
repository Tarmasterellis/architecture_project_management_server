// Express
import express from "express";
// Custom Controllers
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller";

const departmentRouter = express.Router();

const departmentAppend = '/department';
const deleteAppend = '/delete';

// Get Requests
departmentRouter.get(`${departmentAppend}/all`, getAllDepartments);

// Post Requests
departmentRouter.post(`${departmentAppend}/create`, createDepartment);

// Put Requests
departmentRouter.put(`${departmentAppend}/edit`, updateDepartment);

// Delete Request
departmentRouter.delete(`${departmentAppend + deleteAppend}/:id`, deleteDepartment); 

export default departmentRouter;