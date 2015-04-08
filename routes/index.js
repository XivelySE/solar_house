var express = require('express');
var router = express.Router();
var pg = require('../pg.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.sendFile(__base + 'public/dashboard-1.html')

});

/* GET home page. */
router.get('/markers', function(req, res, next) {

    pg.getLocations(function(rows) {

        console.log('locations:');
        console.log(rows);

        res.send(rows);

    });

});

// GET MEASURE ROUTES

// Battery Current
router.get('/markers/batterycurrent', function(req, res, next) {

    pg.getMeasures('BatteryCurrent', function(rows) {

        console.log('BatteryCurrent:');
        console.log(rows);

        res.send(rows);
    });
});

// Appliance Current - OK
router.get('/markers/appliancecurrent', function(req, res, next) {

    pg.getMeasures('ApplianceCurrent', function(rows) {

        console.log('ApplianceCurrent:');
        console.log(rows);

        res.send(rows);
    });
});



// Backup Voltage - OK
router.get('/markers/backupvoltage', function(req, res, next) {

    pg.getMeasures('BackupVoltage', function(rows) {

        console.log('BackupVoltage:');
        console.log(rows);

        res.send(rows);
    });
});

// Battery Voltage - OK
router.get('/markers/batteryvoltage', function(req, res, next) {

    pg.getMeasures('BatteryVoltage', function(rows) {

        console.log('BatteryVoltage:');
        console.log(rows);

        res.send(rows);
    });
});

// Appliance Voltage - OK
router.get('/markers/appliancevoltage', function(req, res, next) {

    pg.getMeasures('ApplianceVoltage', function(rows) {

        console.log('ApplianceVoltage:');
        console.log(rows);

        res.send(rows);
    });
});


module.exports = router;