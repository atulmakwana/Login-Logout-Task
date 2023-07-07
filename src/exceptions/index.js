const DatabaseError = require('./database.error');
const PasswordNotMatchError = require('./password-not-match.error');
const ObjectNotFoundError = require('./object-not-found.error');
const ValidationError = require('./validation.error');
const InternalServerError = require('./internal-server.error')

const exceptions = {
    PasswordNotMatchError,
    ObjectNotFoundError,
    ValidationError,
    DatabaseError,
    InternalServerError,
};

module.exports = exceptions