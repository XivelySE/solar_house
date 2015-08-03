var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 3000));
var server = require('http').createServer(app);
var mqttCustomer = require('./mqtt.js');
var io = require('socket.io').listen(server);


server.listen(app.get('port'));

io.on('connection', function(socket){
  console.log("Connection received");
});

mqttCustomer.setLightAlert(function(value){
  io.emit('lights', value);
});
mqttCustomer.setFanAlert(function(value){
  io.emit('fan', value);
});
mqttCustomer.setSalesAlert(function(value){
  io.emit('sales', value);
});
mqttCustomer.setServiceAlert(function(value){
  io.emit('service', value);
});
mqttCustomer.connectMQTT();
var routes = require('./routes/index');

global.__base = __dirname + '/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
