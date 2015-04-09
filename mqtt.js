var mqtt = require('mqtt');
var pg = require('./pg.js');

var host = 'xitest.broker.xrm.xively.com';
var port = 1883;
var username = "f9991996-455f-420c-a83a-dc1c2690c7f6";
var password = "6xi7vCQHiDFBH+qf/jKs8Q==";
var topicPrefix = "/de289e01-cc13-11e4-a698-0a1f2727d969/solardemo/panel1008";

var client = mqtt.connect({
   host: host,
   port: port,
   clientId: username,
   username: username,
   password: password
});

exports.connectMQTT = function(req, res) {

   // Listening to messages on the mqtt queue
   console.log("Connecting to Broker");
   client.on('connect', function() {
      console.log("Connected");
      client.subscribe(topicPrefix);
   });


   client.on('message', function(topic, message) {

      //console.log(topic);
      result = JSON.parse(message.toString());

      try {

         panelId = 1008;
         panelValue = result[0].value;
         panelSetting = result[0].variableName;

         if (panelSetting == 'ErrorConditionON') {
            console.log(panelId + " " + panelSetting + " " + panelValue);
         }

         if (panelSetting == 'ErrorConditionOFF') {
            console.log(panelId + " " + panelSetting + " " + panelValue);
         }

         if (panelSetting != 'ErrorConditionON' && panelSetting != 'SetAppliance' &&
               panelSetting != 'SetSource' && panelSetting != 'BatteryCharging' && panelSetting != 'ErrorConditionOFF') {

            pg.saveSetting(panelId, panelSetting, panelValue);
         }
      }
      catch(e) {
         console.log('Issue when receiving message');
      }
   });

}

exports.switchLightON = function() {

   var packet = '{"packetType": "command", "variableName": "SetAppliance", "value": "1"}';
   //console.log(packet);
   client.publish(topicPrefix, packet, function() {
      //success('Published. Now what')
   });
}

exports.switchLightOFF = function() {

   var packet = '{"packetType": "command", "variableName": "SetAppliance", "value": "0"}';
   //console.log(packet);
   client.publish(topicPrefix, packet, function() {
      //success('Published. Now what')
   });
}



