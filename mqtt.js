var mqtt = require('mqtt');
var pg = require('./pg.js');
var config = require('./config.js');

var host = config.mqtt.host;
var port = config.mqtt.port;
var username = config.mqtt.username;
var password = config.mqtt.password;
var subscribeTopic = config.mqtt.subscribe;
var cmdTopic = config.mqtt.cmd;

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

        for (i = 0; i < result.length; i++) {

            try {

                if (result[i].packetType == 'sensor') {

                    panelId = 1008;
                    panelValue = result[i].value;
                    panelSetting = result[i].variableName;

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
                        pg.createCase(panelId, panelSetting, fixedValue);
                    }

                    if (panelSetting == 'ErrorConditionOFF') 
                    {
                        //Do nothing
                    }

                    if(panelSetting == 'SetAppliance')
                    {
                        //TODO toggle lights
                    }

                    if (panelSetting == 'PanelWatts') {
                        console.log('Saving PanelWatts value to db');
                        var fixedValue = panelValue.toFixed(2);
                        pg.saveSetting(panelId, panelSetting, fixedValue);
                    }

                    if(panelSetting == 'ApplianceWatts')
                    {
                        console.log('Saving ApplianceWatts value to db');
                        var fixedValue = panelValue.toFixed(2);
                        pg.saveSetting(panelId, panelSetting, fixedValue);
                    }
                }
            } catch (e) {
                console.log('Issue when receiving message');
            }
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