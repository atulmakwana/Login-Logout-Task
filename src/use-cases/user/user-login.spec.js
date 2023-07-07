const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions')

const makeUserLogin = require('./user-login');

const sandbox = sinon.createSandbox();

Before(() => {
    this.email = undefined;
    this.password = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const userDb = {
  getDbUser: function(){},
  getDbUserEmail: function(){}
};

const getDbUserStub = sandbox.stub(userDb, 'getDbUser');
getDbUserStub.callsFake((args) => {
  expect(args).deep.equal({
    email: this.email,
    password:this.password,
  });
  if(args.email=='atul@gmail.com' && args.password=='Atul@12345'){
    return [
      {
        id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        email:'atul@gmail.com',
        password: 'Atul@12345'
      }];
  }
  return [];
});

const getDbUserEmailStub = sandbox.stub(userDb, 'getDbUserEmail');
getDbUserEmailStub.callsFake((args) => {
  if(args.email=='atul@gmail.com'){
    return [
      {
        id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        email:'atul@gmail.com',
        password: 'Atul@12345'
      }];
  }
  return [];
});

Given('user details email: {string} and password:{string} to login',
    (email,password) => {
      this.email = email || undefined;
      this.password = password || undefined;
    },
);

When('Try user to login', async ()=>{
    const userLogin = makeUserLogin({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        PasswordNotMatchError:exceptions.PasswordNotMatchError,
        getDbUser:userDb.getDbUser,
        getDbUserEmail: userDb.getDbUserEmail
    });
    try 
    {
        this.result = await userLogin({
          email: this.email,
          password:this.password
        });

    } 
      catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
      }
});


Then('Throw error: {string} with message: {string} while login', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});

Then('It login user with details: "{string}"', (newcompanyDetails) => {
  expect(JSON.stringify(this.result)).deep.equal(newcompanyDetails);
});
