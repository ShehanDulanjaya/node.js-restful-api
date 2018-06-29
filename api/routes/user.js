const express = require ('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/:userID',userController.get_all_users);


router.post('/signup', userController.Signup);

router.post('/login', userController.login);

router.delete('/:userID', userController.deleteuser);

module.exports = router;