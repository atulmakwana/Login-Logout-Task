const { Client} =require('pg')
const config = require('../config');
const exceptions = require('../exceptions');

const createDbConnection = require('./database-connection');
const connection = createDbConnection({
    Client,
    config
})


const makeUserMethods = require('./users.db');
const userDb = makeUserMethods({
    connection,
    DatabaseError:exceptions.DatabaseError
});

module.exports = { userDb }