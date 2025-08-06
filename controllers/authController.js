import userModel from "../Models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required and greated than 6 charecter");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Register Please Login");
  }
  const user = await userModel.create({ name, email, password });
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user,
  });
};
