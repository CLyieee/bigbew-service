const User = require("../models/userModel");

const userRepository = {
  //   getUser: getUser,
  //   getUsers: getUsers,
  findByEmail: findByEmail,
  //   createUser: createUser,
  updateUser: updateUser,
  //   deleteUser: deleteUser,
  //   search: search,
};

module.exports = userRepository;

async function findByEmail(email) {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    return error;
  }
}

async function updateUser(id, data) {
  try {
    return await User.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    return error;
  }
}
