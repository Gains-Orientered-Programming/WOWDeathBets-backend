import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import cron from 'node-cron';
const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

const message = {
  userId: '123',
  amount: 1000,
};

const payloads: ProduceRequest[] = [{ topic: 'user_transactions', messages: JSON.stringify(message) }];

//TODO should check the betting database for resovled bettings and send
// the results to the user database
//runs every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
});
