var mqtt = require('mqtt');
var pg = require('./pg.js');

exports.connectMQTT = function(req, res) {

   var host = 'xitest.broker.xrm.xively.com';
   var port = 1883;
   //var username = "f9991996-455f-420c-a83a-dc1c2690c7f6"    // Fernando/Web - Device Id
   //var password = "6xi7vCQHiDFBH+qf/jKs8Q=="                // Fernando/Web - Secret

  var username = "edd7358b-9505-44b5-ab93-04ec89de2dbc"     // Peter - Device Id
  var password = "lW4X8e3PDUF9iOBuAIgaXQ=="                // Peter - Secret

   var topicPrefix = "/de289e01-cc13-11e4-a698-0a1f2727d969/solardemo/panel1001"    // 

   var client = mqtt.connect({
      host: host,
      port: port,
      clientId: username,
      username: username,
      password: password
   });

   // Listening to messages on the mqtt queue
   client.on('connect', function() {
      console.log("connecting");
      client.subscribe(topicPrefix);

   });

   client.on('message', function(topic, message) {

      //console.log(topic);
      result = JSON.parse(message.toString());

      panelId = 1001;
      panelValue = result[0].value;
      panelSetting = result[0].variableName;

      console.log(panelId + " " + panelSetting + " " + panelValue);

      if (panelSetting != 'ErrorConditionON' && panelSetting != 'SetAppliance' &&
            panelSetting != 'SetSource' && panelSetting != 'BatteryCharging' && panelSetting != 'ErrorConditionOFF') {

         pg.saveSetting(panelId, panelSetting, panelValue);
      }

   });
}



