import { MongoClient, ObjectId } from 'mongodb';

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

    // Convert userId string to ObjectId
    const objectId = new ObjectId(userId);

    // Delete user by userId
    const deleteResult = await collection.deleteOne({ _id: objectId });

    // Check if user was found and deleted
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  } finally {
    await client.close();
  }
}
