//Controllers are used to config the logic
//Description
//method get
//access
//instead of adding try catch block we will use integrated express async handler
// npm i express-async-handler
const asyncHandler = require('express-async-handler')

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "all users here" });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `the user ${req.params.id}` });
});

const editUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `the user updated ${req.params.id}` });
});

const createUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  //we need a custom error handling middleware
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  res.status(201).send({ message: "the user created" });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `the user ${req.params.id} deleted` });
});

module.exports = { getUsers, getUser, createUser, editUser, deleteUser };
