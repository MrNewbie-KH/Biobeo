const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Kullanıcı kaydı
router.post('/register', userController.register);

// Kullanıcı girişi
router.get('/login', userController.login);

module.exports = router;
