
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginValidationRules, validate } = require('../utils/validator');

router.post('/login', loginValidationRules(), validate, login);

module.exports = router;
