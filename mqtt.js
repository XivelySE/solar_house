var mqtt = require('mqtt');
var pg = require('./pg.js');
var config = require('./config.js');

var host = config.mqtt.host;
var port = config.mqtt.port;
var username = config.mqtt.username;
var password = config.mqtt.password;
var topicPrefix = config.mqtt.topic;

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
        client.subscribe(topicPrefix);
    }, function(err) {
        console.log(err);
    });

    client.on('message', function(topic, message) {

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
                        var fixedValue = panelValue.toFixed(2);
                        pg.saveSetting(panelId, panelSetting, fixedValue);
                    }

                    if(panelSetting == 'ApplianceWatts')
                    {
                        var fixedValue = panelValue.toFixed(2);
                        pg.saveSetting(panelId, panelSetting, fixedValue);
                    }
                }
            } catch (e) {
                console.log('Issue when receiving message');
            }
        }

    });

}

exports.incrementBatteryCycle = function() {

    var packet = '[{"packetType": "sensor", "variableName": "BatteryCycle", "value": "1"}]';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
        //console.log('Published. Now what');
    });
}

exports.simulatePanelErrorON = function() {

    var packet = '[{"packetType": "sensor", "variableName": "ErrorConditionON", "value": "Simulated Error"}]';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
        //console.log('Published. Now what');
    });
}

exports.simulatePanelErrorOFF = function() {

    var packet = '[{"packetType": "sensor", "variableName": "ErrorConditionOFF", "value": "Simulated Error"}]';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
        //console.log('Published. Now what');
    });
}

exports.simulateBatteryEOL = function() {

    var packet = '[{"packetType": "sensor", "variableName": "SalesConditionON", "value": "Sales Cycle"}]';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
        //console.log('Published. Now what');
    });
}

exports.simulateBatteryReplace = function() {

    var packet = '[{"packetType": "sensor", "variableName": "SalesConditionOFF", "value": "Sales Cycle"}]';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
        //console.log('Published. Now what');
    });
}

exports.switchLightOFF = function() {

    var packet = '{"packetType": "command", "variableName": "SetAppliance", "value": "OFF"}';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
    });
}

exports.switchLightON = function() {

    var packet = '{"packetType": "command", "variableName": "SetAppliance", "value": "ON"}';
    //console.log(packet);
    client.publish(topicPrefix, packet, function() {
        //success('Published. Now what')
    });
}