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
      //console.log(message.toString());

      result = JSON.parse(message.toString());

      //panelId = result.datastreams[0].current_value;
      panelId = result.datastreams[0].current_value.split('-')[1];
      panelValue = result.datastreams[1].current_value;
      panelSetting = result.datastreams[2].current_value;

      console.log(panelId + " " + panelSetting + " " + panelValue);

      pg.saveValue(panelId, panelSetting, panelValue);

    });    
}



