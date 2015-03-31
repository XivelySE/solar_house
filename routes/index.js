var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        title: 'Express'
    });
});

/* GET home page. */
router.get('/locations/:id', function(req, res, next) {

    res.send("Location " + req.params.id);
});

/* GET home page. */
router.get('/markers', function(req, res, next) {

    var pg = require('pg');

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
            //return console.error('error running query', err);
            res.send('error running query ' + err);
        }
        else {

            console.log(result.rows[0]);

            //output: 1
            pgClient.end();

            res.send(result.rows);
        }
    });
    
});

/* POST Marker. */
router.post('/markers', function(req, res, next) {

    //locations
    //

    console.log(req);

    var pg = require('pg');

    var pgClient = new pg.Client({
        user: "putujooxlyfpep",
        password: "uO1GsyvEHAx5lRAVTJA23X_fAD",
        database: "d2incm6jg4v8nm",
        port: 5432,
        host: "ec2-23-21-73-32.compute-1.amazonaws.com",
        ssl: true
    }); 

    pgClient.connect();    

    pgClient.query('INSERT INTOlocations  VALUES()', function(err, result) {
        //call `done()` to release the client back to the pool
        //done();

        if (err) { 
            //return console.error('error running query', err);
            res.send('error running query ' + err);
        }
        else {

            console.log(result.rows[0]);

            //output: 1
            pgClient.end();

            res.send(result.rows);
        }
    }); 

});

module.exports = router;