var config = {}

config.db = {};
config.mqtt = {};


config.db.host = process.env.DB_HOST || 'ec2-23-21-73-32.compute-1.amazonaws.com';
config.db.port = process.env.DB_PORT || 5432;
config.db.username = process.env.DB_USERNAME || 'putujooxlyfpep';
config.db.password = process.env.DB_PASSWORD || 'uO1GsyvEHAx5lRAVTJA23X_fAD';
config.db.database = process.env.DB_NAME || 'd2incm6jg4v8nm';

config.mqtt.host = process.env.MQTT_HOST || 'xitest.broker.xrm.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;
config.mqtt.username = process.env.MQTT_USERNAME || 'edd7358b-9505-44b5-ab93-04ec89de2dbc';
config.mqtt.password = process.env.MQTT_PASSWORD || 'lW4X8e3PDUF9iOBuAIgaXQ==';
config.mqtt.topic = process.env.MQTT_TOPIC || '/de289e01-cc13-11e4-a698-0a1f2727d969/solardemo/panel0001';
// var topicPrefix = "/de289e01-cc13-11e4-a698-0a1f2727d969/solardemo/panel1008";

module.exports = config;