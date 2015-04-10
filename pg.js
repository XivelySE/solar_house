var pg = require('pg');

options = {
    user: "putujooxlyfpep",
    password: "uO1GsyvEHAx5lRAVTJA23X_fAD",
    database: "d2incm6jg4v8nm",
    port: 5432,
    host: "ec2-23-21-73-32.compute-1.amazonaws.com",
    ssl: true
}

exports.saveSetting = function(panelId, settingType, settingValue) {

    pg.connect(options, function(err, pgClient, done) {

        if (err) {
            console.log(err);

        }
        else {

            var query = 'INSERT INTO locationlogs(locationid, panelid, settingtype, settingvalue, timestamp) values($1, $2, $3, $4, $5)';

            pgClient.query(query, ['1', panelId, settingType, settingValue, new Date()], function(err, result) {

                done();

                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log('INSERT COMPLETED');
                }

            });
        }

    });
}

exports.getMeasures = function(settingType, success, error) {

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query('SELECT timestamp, settingtype, settingvalue FROM locationlogs WHERE settingtype = $1 ORDER BY timestamp DESC LIMIT 1',
                        [settingType], function(err, result) {


            done();

            if (err) {

                error(err);
            }
            else {
                success(result.rows[0]);
            }
        });
    });
}

exports.getLocations = function(success, error) {

    pg.connect(options, function(err, pgClient, done) {

        pgClient.query('SELECT * FROM locations', function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {

                pgClient.end();
                return err;
            }
            else {

                success(result.rows);

            }
        });
    });

}
