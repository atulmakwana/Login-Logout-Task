function createmysqlConnection({
    config,
    Client
}) {
    const cockroach = new Client({
        host: config.cockroach.host,
        user: config.cockroach.user,
        database: config.cockroach.database,
        port:config.cockroach.port,
        SSL: {
                rejectUnauthorized:false
        }
    });
    cockroach.connect(function(err){
        if(err){
            console.log("Cockroach connection error occured: ",err);
        }
        else{
            console.log("Cockroach connection succesfulll...");
        }
    });
    return cockroach
}
module.exports = createmysqlConnection;