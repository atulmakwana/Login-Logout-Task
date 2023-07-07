module.exports = function makeUserMethods({
    connection,
    DatabaseError
})
{
    return Object.freeze({
        getDbUserEmail,
        getDbUser,
    });
    async function getDbUserEmail({email})
    {
        console.log("AAAAAAAAAAAAAA");
        try {
            const result=await connection.query( `select * from users where user_email=($1)`,[email]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getUserEmail":error})
        }
    }
    async function getDbUser({email,password})
    {
        console.log("AAAAAAAAAAAAAA");

        try {
            const result=await connection.query( `select * from users where user_email=($1) and password=$2`,[email,password]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getUser":error})
        }
    }
}