import { Consumer, KafkaClient } from 'kafka-node';
import User from '../models/user-model';
const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const topics = [{ topic: 'user_transactions' }];

const consumer = new Consumer(client, [{ topic: 'topic_name' }], { autoCommit: true });

interface Betting {
  _id: string;
  userId: string;
  characterName: string;
  region: string;
  realm: string;
  amount: number;
  status: 'pending' | 'concluded' | 'resolved';
}

consumer.on('message', async (message) => {
  const concludedBettings: Betting[] = JSON.parse(message.value.toString()) as Betting[];

  for (const betting of concludedBettings) {
    const user = await User.findOne({ _id: betting.userId });

    if (user) {
      user.currency += betting.amount;
      await user.save();
      console.log(`Updated user ${betting.userId} with amount: ${betting.amount}`);
    } else {
      console.log(`User ${betting.userId} not found.`);
    }
  }
});

consumer.on('error', (err) => {
  console.log('error: ', err);
});
