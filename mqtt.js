var mqtt = require('mqtt');
var pg = require('./pg.js');

exports.connectMQTT = function(req, res) {

    var mqttURL = 'mqtt://test.mosquitto.org';
    var client = mqtt.connect(mqttURL);    

     // Listening to messages on the mqtt queue
    client.on('connect', function () {
      console.log("connecting");
      client.subscribe('mqtt/demolmi');

    });

    client.on('message', function(topic, message) {
      
      console.log(topic);
      console.log(message.toString());
      //pg.save();

    });    
}



