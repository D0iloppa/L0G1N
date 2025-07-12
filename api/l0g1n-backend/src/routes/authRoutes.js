const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/check-duplicate', AuthController.checkDuplicate);
router.post('/register', AuthController.register);


module.exports = router;