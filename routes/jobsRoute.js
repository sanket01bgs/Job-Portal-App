import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobs,
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

export default router;
