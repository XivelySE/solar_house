var pg = require('pg');

exports.saveValue = function(panelId, settingType, settingValue) {

    var pgClient = new pg.Client({
        user: "putujooxlyfpep",
        password: "uO1GsyvEHAx5lRAVTJA23X_fAD",
        database: "d2incm6jg4v8nm",
        port: 5432,
        host: "ec2-23-21-73-32.compute-1.amazonaws.com",
        ssl: true
    });

    pgClient.connect();

    var query = 'INSERT INTO locationlogs(locationid, panelid, settingtype, settingvalue) values($1, $2, $3, $4)';

    pgClient.query(query, ['1', panelId, settingType, settingValue], function(err, result) {

        if (err) {

            console.log(err);
            throw err;
        }
        else {

            console.log(result);
            pgClient.end();
        }

    });

}

exports.getMeasures = function(settingType, success, error) {

    var pgClient = new pg.Client({
        user: "putujooxlyfpep",
        password: "uO1GsyvEHAx5lRAVTJA23X_fAD",
        database: "d2incm6jg4v8nm",
        port: 5432,
        host: "ec2-23-21-73-32.compute-1.amazonaws.com",
        ssl: true
    });

    pgClient.connect();

    pgClient.query('SELECT * FROM locationlogs WHERE panelid = $1 AND settingtype = $2 LIMIT 1',['1', settingType], function(err, result) {
        //call `done()` to release the client back to the pool
        //done();

        if (err) {

            pgClient.end();
            error(err);
        }
        else {
            pgClient.end();
            success(result.rows);
        }
    });
}

exports.getLocations = function(success, error) {

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

            pgClient.end();
            return err;
        }
        else {

            pgClient.end();
            success(result.rows);

        }
    });

}
