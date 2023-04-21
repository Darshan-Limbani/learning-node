const express = require('express');
const userController = require("../controllers/userController");

const router = express.Router();

router.route('/api/v1/users')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/api/v1/users/:id')
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
    .get(userController.getUser);

module.exports = router;