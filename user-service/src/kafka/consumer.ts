import { Consumer, KafkaClient as Client } from 'kafka-node';
import User from '../models/user-model';
const client = new Client({ kafkaHost: 'localhost:9092' });

const consumer = new Consumer(client, [{ topic: 'user_transactions' }], { autoCommit: true });

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
  //get concluded bettings
  const concludedBettings: Betting[] = JSON.parse(message.value.toString()) as Betting[];
  //update user currency
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
