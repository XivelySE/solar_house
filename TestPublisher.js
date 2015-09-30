var mqtt = require('mqtt');
var request = require('request');
var sleep = require('sleep');
var config = require('./config.js');

var org = "3ba869a4-587c-499e-bede-90dc529cb6ae";
var devices = [
    {
        id: "4cd7e424-3f32-417d-8a85-1ae9b267d3ab",
        channel: "xi/blue/v1/6a3ec5d3-a188-41ff-bebd-0cbe80cbd29d/d/4cd7e424-3f32-417d-8a85-1ae9b267d3ab/telemetry",
        secret: "W/FQLnw/35+OY1aOs2vc8J0ukPfz38TzLoG2Uhs6LqM="
    }
];

var client = mqtt.connect({
    host: "broker.demo.xively.com",
    port: 1883,
    clientId: 'e960db00-60f9-4618-8a7f-33d7c64736b6',
    username: 'e960db00-60f9-4618-8a7f-33d7c64736b6',
    password: 'I1sZLCdd4VuWUBwonyX1I/e3ySZUlBCifTsa9waseuw='
});


client.on('connect', function() {
    console.log("Connected to broker");
    while(true){
        for (var i in devices){
            var rand = Math.random();
            var payload = {
                packetType: 'sensor',
                value: rand * 1000,
                variableName: 'PanelWatts'
            }
            this.publish(devices[i].channel, JSON.stringify(payload));
            console.log(rand.toString());
        }    
        sleep.usleep(2000000);
    }
}, function(err) {
    console.log(err);
});
