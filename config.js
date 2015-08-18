var config = {}

config.db = {};
config.mqtt = {};


config.db.host = process.env.DB_HOST || 'ec2-23-21-73-32.compute-1.amazonaws.com';
config.db.port = process.env.DB_PORT || 5432;
config.db.username = process.env.DB_USERNAME || 'putujooxlyfpep';
config.db.password = process.env.DB_PASSWORD || 'uO1GsyvEHAx5lRAVTJA23X_fAD';
config.db.database = process.env.DB_NAME || 'd2incm6jg4v8nm';

config.mqtt.host = process.env.MQTT_HOST || 'broker.demo.xively.com';
config.mqtt.port = process.env.MQTT_PORT || 1883;

//Gavin device 4
config.mqtt.username = process.env.MQTT_USERNAME || '92b80b63-5b06-49a3-b133-6625efac36a3'; 
config.mqtt.password = process.env.MQTT_PASSWORD || 'b/bGvaiNOa43TlPYIuj7SRK4Psluxs5lr6Qyu15U32U=';

//Gavin device 1
config.mqtt.subscribe = process.env.MQTT_TOPIC_SUB || "xi/blue/v1/6a3ec5d3-a188-41ff-bebd-0cbe80cbd29d/d/4cd7e424-3f32-417d-8a85-1ae9b267d3ab/telemetry";

config.mqtt.cmd = process.env.MQTT_TOPIC_CMD || "xi/blue/v1/6a3ec5d3-a188-41ff-bebd-0cbe80cbd29d/d/4cd7e424-3f32-417d-8a85-1ae9b267d3ab/telemetry/cmd";

module.exports = config;