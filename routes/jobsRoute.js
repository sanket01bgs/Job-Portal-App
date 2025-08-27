import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobs,
  jobStateController,
  updateJobs,
} from "../controllers/jobsController.js";

const router = express.Router();

//Routes
//create job || POST
router.post("/create-job", userAuth, createJobController);

//GET job || GET
router.get("/get-job", userAuth, getAllJobs);

//Update job || PUT or PATCH
router.patch("/update-job/:id", userAuth, updateJobs);

//Delete job || Delete
router.delete("/delete-job/:id", userAuth, deleteJobController);

// JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStateController);

export default router;
