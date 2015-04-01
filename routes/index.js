var express = require('express');
var router = express.Router();
var pg = require('../pg.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.sendFile(__base + 'public/dashboard-1.html')

});

router.get('/markers/:id/panel/current', function(req, res, next) {

    pg.getMeasures('panelcurrent', function(rows) {

        console.log('panelcurrent:');
        console.log(rows);

        res.send(rows);
    });
});

router.get('/markers/:id/battery/voltage', function(req, res, next) {

    pg.getMeasures('batteryvoltage', function(rows) {

        console.log('batteryvoltage:');
        console.log(rows);

        res.send(rows);
    });
});

/* GET home page. */
router.get('/markers', function(req, res, next) {

    pg.getLocations(function(rows) {

        console.log('locations:');
        console.log(rows);

        res.send(rows);

    });

});

module.exports = router;