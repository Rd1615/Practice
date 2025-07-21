const express = require("express");
const router = express.Router();
const userController = require("../controller/usersController.js");

router.get('/users',userController.getUsers);
router.post('/users',userController.addUsers);
router.get('/users/:id',userController.getUserById);
router.put('/users/:id',userController.updateUser);
router.delete('/users',userController.deleteUser);

module.exports = router;