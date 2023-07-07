const controllers = require('./controllers');

const express= require('express');

const router=express.Router();

router.get('/login', controllers.userAction.userLoginAction);
router.get('/logout', controllers.userAction.userLogoutAction);

module.exports = { router };