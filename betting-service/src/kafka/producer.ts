import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import cron from 'node-cron';
import Betting from '../models/betting-model';

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

//runs every 30 minutes and send concluded bettings to kafka
cron.schedule('*/30 * * * *', async () => {
  //get concluded bettings
  const concludedBettings = await Betting.find({ status: 'concluded' });
  const payloads: ProduceRequest[] = [{ topic: 'user_transactions', messages: JSON.stringify(concludedBettings) }];
  //send concluded bettings to kafka
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
  //update bettings status to resolved
  for (const betting of concludedBettings) {
    betting.status = 'resolved';
    await betting.save();
  }
});
