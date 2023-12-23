import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

const message = {
  userId: '123',
  amount: 1000,
};

const payloads: ProduceRequest[] = [{ topic: 'user_transactions', messages: JSON.stringify(message) }];

producer.send(payloads, (err, data) => {
  if (err) {
    console.error('Error sending message:', err);
  } else {
    console.log('Message sent:', data);
  }
});
