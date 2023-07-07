module.exports = function makeUserLogout({
    Joi, 
    ValidationError,
    ObjectNotFoundError,
    PasswordNotMatchError,
    getDbUserEmail,
    getDbUser
})
{
    return async function userLogout({email,password})
    {
        try{
            const value  = await validateInputData({email,password});

            const isEmailExist = await getDbUserEmail({ email:value.email } );

            if( !isEmailExist.length )
            {
                throw new ObjectNotFoundError("There is no such user exist with this email!");
            }

            const isUser = await getDbUser({ email:value.email,password:value.password } );

            if( !isUser.length )
            {
                throw new PasswordNotMatchError("Password doesn't match!");
            }

            return isUser;
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            email:Joi.string().min(5).required(),
            password:Joi.string().min(8) 
                    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/)
                    .required(),
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at userLogout "+error.message)
        }
        return value;
    }
}