const express = require('express');
const authController = require("../controllers/auth.controller");

const router = express.Router();

// user auth api
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('user/logout',authController.logoutUser);

//foodpartner api
router.post('/food-partner/register',authController.registerFoodPartner);
router.post('/food-partner/login',authController.loginFoodPartner);
router.get('/food-partner/logout',authController.logoutFoodPartner);

module.exports = router;