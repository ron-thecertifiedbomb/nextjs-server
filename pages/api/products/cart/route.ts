import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    
    // Destructuring the request body
    const {
      userId = '', // Assuming the user's _id is passed along with the request
      cartItem = {}, // Assuming the cart item data is passed along with the request
    } = JSON.parse(request.body);

    // Accessing the collection
    const collection = db.collection('cart');

    // Creating ObjectId instance for user's _id
    const objectId = new ObjectId(userId);

    // Finding the user's cart
    const userCart = await collection.findOne({ _id: objectId });

    if (userCart) {
      // User's cart exists, push the new cart item to CartItems array
      await collection.updateOne(
        { _id: objectId },
        { $push: { CartItems: cartItem } }
      );

      response.status(200).json({
        message: 'Cart item successfully added to user\'s cart',
        cartItem: cartItem,
      });
    } else {
      // User's cart does not exist, return an error
      response.status(404).json({ message: 'User\'s cart not found' });
    }
  } catch (error) {
    console.error('Error adding cart item to user\'s cart:', error);
    response.status(500).json({ message: 'Error adding cart item to user\'s cart', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
