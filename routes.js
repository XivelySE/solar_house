var express = require('express');
var router = express.Router();
var hehe = require('./utils.js');

router.get('/sample', function(req, res, next){

    res.send("This is myyy sample 2!");

});

router.get('/sample/:id', function(req, res, next){

    var a = req.params.id;

    b = hehe.helloWorld();

    res.send("This " + a + " sample! " + b);

});

module.exports = router;