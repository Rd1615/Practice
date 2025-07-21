const userModule = require("../models/userModule.js");

userModule.createTable();

exports.getUsers = async (req, res) => {
  try {
    const users = await userModule.getAllUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addUsers = async (req, res) => {
  try {
    const id = await userModule.createUser(req.body);
    res.status(201).json({ message: "User created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userModule.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const rowsAffected = await userModule.updateUser(req.params.id, req.body);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const rowsAffected = await userModule.deleteUser(req.body.id);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
