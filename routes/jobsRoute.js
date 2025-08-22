import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobs,
} from "../controllers/jobsController.js";

const router = express.Router();

//Routes
//create job || POST
router.post("/create-job", userAuth, createJobController);

//GET job || GET
router.get("/get-job", userAuth, getAllJobs);

export default router;
