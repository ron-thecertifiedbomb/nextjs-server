import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = 'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('my_cart_database');
    const collection = db.collection('users');

    if (req.method === 'GET') {
      const users = await collection.find({}).toArray();
      res.status(200).json(users);
      console.log(users)
    }

  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
