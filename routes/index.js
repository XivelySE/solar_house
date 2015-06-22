var express = require('express');
var router = express.Router();
var pg = require('../pg.js');
var mqtt = require('../mqtt.js');

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

// SIMULATE PANEL ERROR ON / ERROR OFF
router.get('/button/service', function(req, res, next) {

    mqtt.toggleService();
    res.send('ok');
});

// BATTERY EOL & REPLACEMENT
router.get('/button/sales', function(req, res, next) {

    mqtt.toggleSales();
    res.send('ok');
});


// TOGGLE LIGHTS
router.get('/button/lights', function(req, res, next) {
    mqtt.toggleLights();
    res.send('ok');
});

// FAN ON AND OFF 
router.get('/button/fan', function(req, res, next) {
    mqtt.toggleFan();
    res.send('ok');
});

// GET MEASURE ROUTES
// Battery Current
router.get('/markers/batterycurrent', function(req, res, next) {

    pg.getMeasures('BatteryCurrent', function(rows) {
        res.send(rows);
    });
});

// Panel Watts - OK
router.get('/markers/panelwatts', function(req, res, next) {

    pg.getMeasures('PanelWatts', function(rows) {

      //  console.log('PanelWatts:');
      //  console.log(rows);

        res.send(rows);
    });
});

// Panel Current - OK
router.get('/markers/panelcurrent', function(req, res, next) {

    pg.getMeasures('PanelCurrent', function(rows) {

        res.send(rows);
    });
});

// Appliance Current - OK
router.get('/markers/appliancecurrent', function(req, res, next) {

    pg.getMeasures('ApplianceCurrent', function(rows) {

        // console.log('ApplianceCurrent:');
        // console.log(rows);

        res.send(rows);
    });
});

// Appliance Current - OK
router.get('/markers/appliancewatts', function(req, res, next) {

    pg.getMeasures('ApplianceWatts', function(rows) {

        // console.log('ApplianceCurrent:');
        // console.log(rows);

        res.send(rows);
    });
});

// Backup Voltage - OK
router.get('/markers/backupvoltage', function(req, res, next) {

    pg.getMeasures('BackupVoltage', function(rows) {

        // console.log('BackupVoltage:');
        // console.log(rows);

        res.send(rows);
    });
});

// Battery Voltage - OK
router.get('/markers/batteryvoltage', function(req, res, next) {

    pg.getMeasures('BatteryVoltage', function(rows) {

        // console.log('BatteryVoltage:');
        // console.log(rows);

        res.send(rows);
    });
});

// Appliance Voltage - OK
router.get('/markers/appliancevoltage', function(req, res, next) {

    pg.getMeasures('ApplianceVoltage', function(rows) {

        // console.log('ApplianceVoltage:');
        // console.log(rows);

        res.send(rows);
    });
});


module.exports = router;