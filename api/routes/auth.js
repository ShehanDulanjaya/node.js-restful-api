const express = require ('express');
const router = express.Router();
const checkAuth = require('../middleware/authCheckOnline');


router.post('/', checkAuth);

module.exports = router;