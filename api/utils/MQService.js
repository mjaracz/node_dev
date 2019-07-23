const amqp = require("amqp-connection-manager");
const echangeName = 'JSON_exchange';

const connection = amqp.connect(["amqp://izjdyntb:R_Kkru4csLxjQXuSc3-0l5UUqr7r-WAW@bear.rmq.cloudamqp.com/izjdyntb"]);
connection.on('connect', () => console.log('[AMQP] CONNECTED!'));
connection.on('disconnect', (err) => console.log('[AMQP] DISCONNECTED' + err.stack))

const channelWrapper = connection.createChannel({ 
  json: true,
  setup: channel => channel.assertExchange(echangeName, 'topic')
});

const sendMessage = (routingKey, data) => {
  channelWrapper.publish(echangeName, routingKey, data)
    .then(() => {
      console.log('[AMQP] Message sent')
    })
    .catch(err => {
      console.log('[AMQP] message was rejected ' + err.stack);
      channelWrapper.close;
      connection.close;
    })
};

module.exports = sendMessage;
