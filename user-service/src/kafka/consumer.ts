import { Consumer, KafkaClient } from 'kafka-node';
import User from '../models/user-model';
const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const topics = [{ topic: 'user_transactions' }];

const consumer = new Consumer(client, [{ topic: 'topic_name' }], { autoCommit: true });

consumer.on('message', async (message) => {
  try {
    let transaction;
    if (typeof message.value === 'string') {
      transaction = JSON.parse(message.value);
    } else {
      transaction = JSON.parse(message.value.toString());
    }

    const { userId, amount } = transaction;

    const user = await User.findOne({ _id: userId });

    if (user) {
      user.currency += amount;
      await user.save();
      console.log(`Updated user ${userId} with amount: ${amount}`);
    } else {
      console.log(`User ${userId} not found.`);
    }

    console.log(`Received transaction for user ${userId}. Adding amount: ${amount}`);
    // Perform the update operation in your database for the given userId
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

consumer.on('error', (err) => {
  console.log('error: ', err);
});
