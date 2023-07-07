const { user } = require('../../use-cases');
const exceptions = require('../../exceptions')

const makeuserLoginAction = require('./user-login');
const userLoginAction = makeuserLoginAction({
    InternalServerError:exceptions.InternalServerError,
    userLogin:user.userLogin
});

const makeuserLogoutAction = require('./user-logout');
const userLogoutAction = makeuserLogoutAction({
    InternalServerError:exceptions.InternalServerError,
    userLogout:user.userLogout
});


const companyActions = Object.freeze({
    userLoginAction,
    userLogoutAction,
});

module.exports = companyActions;