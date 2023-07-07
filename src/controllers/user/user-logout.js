module.exports = function makeUserLogoutAction({
    InternalServerError,
    userLogout
})
{
    return async function userLogoutAction(req,res)
    {
        try{
            const result = await userLogout({ email:req.body.email, password:req.body.password });
            res.status(200).send("Logout  successfull");
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}