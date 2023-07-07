module.exports = function makeUserLoginAction({
    InternalServerError,
    userLogin
})
{
    return async function userLoginAction(req,res)
    {
        try{
            const result = await userLogin({ email:req.body.email, password:req.body.password });
            res.status(200).send("Login  successfull");
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}