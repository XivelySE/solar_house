var mqtt = require('mqtt');
var pg = require('./pg.js');
var config = require('./config.js');

var host = config.mqtt.host;
var port = config.mqtt.port;
var username = config.mqtt.username;
var password = config.mqtt.password;
var subscribeTopic = config.mqtt.subscribe;
var cmdTopic = config.mqtt.cmd;

var lightAlert = null;
var fanAlert = null;

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
    //console.log(client);
    client.on('connect', function() {
        console.log("Connected");
        client.subscribe(subscribeTopic);
    }, function(err) {
        console.log(err);
    });

    client.on('message', function(topic, message) {
    try{
        result = JSON.parse(message.toString());

            try {

                if (result.packetType == 'sensor') {
                    panelId = 1008;
                    panelValue = result.value;
                    panelSetting = result.variableName;

                    if (panelSetting == 'SalesConditionON') {
                        pg.createOpportunity();
                    }

                    if(panelSetting == 'SalesConditionOFF')
                    {
                        //Do nothing
                    }

                    if (panelSetting == 'ErrorConditionON') 
                    {
                        console.log(panelId + " " + panelSetting + " " + panelValue);
                        pg.createCase(panelId, panelSetting, panelValue);
                    }

                    if (panelSetting == 'ErrorConditionOFF') 
                    {
                        //Do nothing
                    }

                    if(panelSetting == 'SetAppliance')
                    {
                        lightAlert(result.value);
                    }

                    if(panelSetting == 'Fan'){
                        fanAlert(result.value);
                    }

                    if (panelSetting == 'PanelWatts') {
                        pg.saveSetting(panelId, panelSetting, panelValue);
                    }

                    if(panelSetting == 'ApplianceWatts')
                    {
                        pg.saveSetting(panelId, panelSetting, panelValue);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        } catch(e) {
            console.log('Couldnt parse message');
        }
    });

}
exports.toggleService = function() {
    console.log('publishing SERVICE');
    client.publish(cmdTopic, 'SERVICE');
}

exports.toggleSales = function() {
    console.log('publishing SALES');
    client.publish(cmdTopic, 'SALES');
}

exports.toggleLights = function() {
    console.log('publishing LIGHTS');
    client.publish(cmdTopic, 'LIGHTS');
}

exports.toggleFan = function() {
    console.log('publishing FAN')
    client.publish(cmdTopic, 'FAN');
}

exports.setLightAlert = function(_lightAlert){
    lightAlert = _lightAlert;
}

exports.setFanAlert = function(_fanAlert){
    fanAlert = _fanAlert;
}