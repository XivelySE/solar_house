var config = {}

config.db = {};
config.mqtt = {};


config.db.host = process.env.DB_HOST || 'ec2-54-204-20-209.compute-1.amazonaws.com';
config.db.port = process.env.DB_PORT || 5432;
config.db.username = process.env.DB_USERNAME || 'wxojivwlaigntn';
config.db.password = process.env.DB_PASSWORD || 'O3J4D6W1xjoODGCQKStcEU4EEN';
config.db.database = process.env.DB_NAME || 'datavivc428g43';

config.mqtt.host = process.env.MQTT_HOST || 'broker.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;

//Gavin device 4
config.mqtt.username = process.env.MQTT_USERNAME || '25357715-c40c-444a-9f9a-b08f2ac86056'; 
config.mqtt.password = process.env.MQTT_PASSWORD || 'QBW+ULkkVXyYNETLLwxJmg==';

//Gavin device 1
config.mqtt.topic = process.env.MQTT_TOPIC || 'xi/blue/v1/9860a5f8-3b12-4086-963c-2830ce434835/d/93a1ce68-f61a-4be6-8bca-3353b81db1eb/solarpanel';
// var topicPrefix = "/de289e01-cc13-11e4-a698-0a1f2727d969/solardemo/panel1008";

module.exports = config;