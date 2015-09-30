var config = {}

config.db = {};
config.mqtt = {};


config.db.host = process.env.DB_HOST || 'ec2-23-21-73-32.compute-1.amazonaws.com';
config.db.port = process.env.DB_PORT || 5432;
config.db.username = process.env.DB_USERNAME || 'putujooxlyfpep';
config.db.password = process.env.DB_PASSWORD || 'uO1GsyvEHAx5lRAVTJA23X_fAD';
config.db.database = process.env.DB_NAME || 'd2incm6jg4v8nm';

config.mqtt.host = process.env.MQTT_HOST || 'broker.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;

//Gavin device 4
config.mqtt.username = process.env.MQTT_USERNAME || '6a3ec5d3-a188-41ff-bebd-0cbe80cbd29d'; 
config.mqtt.password = process.env.MQTT_PASSWORD || 'Basic ZWRlODk3ZGNkZmM5ZGI3NmM2MDA0ZDgzMDlhMTg3ZDA6ZGE1MWYxNWYxM2Q2MWFjNDQzMTllZmUxZGYyZGZkZDc=';

//Gavin device 1
config.mqtt.subscribe = process.env.MQTT_TOPIC_SUB || "xi/blue/v1/9860a5f8-3b12-4086-963c-2830ce434835/d/08cabace-9065-4224-871a-c6302ad62b6f/solar_house";

config.mqtt.cmd = process.env.MQTT_TOPIC_CMD || "xi/blue/v1/9860a5f8-3b12-4086-963c-2830ce434835/d/08cabace-9065-4224-871a-c6302ad62b6f/solar_house/cmd";

module.exports = config;