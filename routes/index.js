var express = require('express');
var router = express.Router();
var pg = require('../pg.js');

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

    locations = pg.getLocations();
    res.send(locations);
    
});

module.exports = router;