import jobsModel from "../Models/jobsModel.js";
import mongoose from "mongoose";

// *****Create job******
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

// *****Get job******
export const getAllJobs = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

// *****UPdate job******
export const updateJobs = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please provide all fields");
  }
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no job found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorised to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //response
  res.status(200).json({ updateJob });
};

// ********Delete Job *********
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no job found with this ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorised to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

/******** JOBS STATS AND FILTERS  ***********/
export const jobStateController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    // search by user job
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
  ]);
  res.status(200).json({ totalJobs: stats.length, stats });
};
