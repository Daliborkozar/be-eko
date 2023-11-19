const express = require('express');
const { getUsers, getUser, editUser, createUser, deleteUser } = require('../controllers/usersController')

const router = express.Router();

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getUser).put(editUser).delete(deleteUser)

// router.route('/:id').put((req, res) => {
//     res.status(200).send({ message: `the user updated ${req.params.id}`})
// })

module.exports = router