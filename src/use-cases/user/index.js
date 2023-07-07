const Joi  = require('joi');

const { userDb } = require('../../data-access');
const exceptions = require('../../exceptions')


const makeUserLogin = require('./user-login');
const userLogin = makeUserLogin({
    Joi, 
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    PasswordNotMatchError:exceptions.PasswordNotMatchError,
    getDbUser:userDb.getDbUser,
    getDbUserEmail:userDb.getDbUserEmail
});

const makeUserLogout = require('./user-logout');
const userLogout = makeUserLogout({
    Joi, 
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    PasswordNotMatchError:exceptions.PasswordNotMatchError,
    getDbUser:userDb.getDbUser,
    getDbUserEmail:userDb.getDbUserEmail
});

module.exports = Object.freeze({
    userLogin,
    userLogout,
})