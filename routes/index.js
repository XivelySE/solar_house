var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        title: 'Express'
    });
});

/* GET home page. */
router.get('/entity/:id', function(req, res, next) {

    res.send("Hello " + req.params.id);
});

/* GET home page. */
router.get('/markers', function(req, res, next) {

    var pg = require('pg');

    var pgClient = new pg.Client({
        user: "eoyljjhgdlmcde",
        password: "xXDn5k8z949vwV47S_TIYYn6-k",
        database: "d7eiah1skfh763",
        port: 5432,
        host: "ec2-107-22-173-230.compute-1.amazonaws.com",
        ssl: true
    }); 

    pgClient.connect();    

    pgClient.query('SELECT * FROM houses', function(err, result) {
        //call `done()` to release the client back to the pool
        //done();

        if (err) { 
            //return console.error('error running query', err);
            res.send('error running query ' + err);
        }
        else {

            //output: 1
            pgClient.end();

            console.log(result.rows[0]);
            res.send(result.rows[0]);
        }
    });
    
});

/* POST Marker. */
router.post('/markers', function(req, res, next) {

    console.log(req);
    
});

module.exports = router;