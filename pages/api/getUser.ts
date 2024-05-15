import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = 'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('storage');
    const collection = db.collection('users');

    // Assuming userId is passed in the request query
    const userId = req.query.userId;
    
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch user by userId
    const user = await collection.findOne({ _id: userId });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  } finally {
    await client.close();
  }
}
