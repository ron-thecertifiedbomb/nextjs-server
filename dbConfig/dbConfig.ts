import { MongoClient } from 'mongodb';


export default async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  }