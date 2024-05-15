import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const uri = 'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('storage');
    const collection = db.collection('users');

    if (req.method === 'DELETE') {
        const { id } = req.body;
      console.log('ID from the server', id);
      // Check if ID is provided
      if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
      }


      const ObjectId = require("mongodb").ObjectId

      // Delete item by ID
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

      // Check if item was found and deleted
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }

      // Return success message
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(405).json({ message: 'Only DELETE requests are allowed' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  } finally {
    await client.close();
  }
}
