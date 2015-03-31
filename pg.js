var pg = require('pg');

exports.saveValue = function(value) {

    var pgClient = new pg.Client({
        user: "putujooxlyfpep",
        password: "uO1GsyvEHAx5lRAVTJA23X_fAD",
        database: "d2incm6jg4v8nm",
        port: 5432,
        host: "ec2-23-21-73-32.compute-1.amazonaws.com",
        ssl: true
    });     

    // pgClient.connect();    

    // pgClient.query('SELECT INTO locationsData', function(err, result) {

    //     if (err) { 

    //         console.log(err);
    //         throw err;
    //     }
    //     else {

    //         console.log(result);
    //         pgClient.end();            
    //     }

    // });        

}

exports.getLocations = function() {

    var pgClient = new pg.Client({
        user: "putujooxlyfpep",
        password: "uO1GsyvEHAx5lRAVTJA23X_fAD",
        database: "d2incm6jg4v8nm",
        port: 5432,
        host: "ec2-23-21-73-32.compute-1.amazonaws.com",
        ssl: true
    });     

    pgClient.connect();    

    pgClient.query('SELECT * FROM locations', function(err, result) {
        //call `done()` to release the client back to the pool
        //done();

        if (err) { 

            return err;
        }
        else {

            //output: 1
            pgClient.end();

            return result.rows;
        }
    });

}
