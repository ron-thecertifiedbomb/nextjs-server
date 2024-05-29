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
      userId = '', 
      CartItems: [
        {
          name = '',
          price =  '',
          quantity = '',
          totalOrderPrice = '',
          quantityOrdered = '',
          isSelected = '',
          dateAdded = '',
          timeAdded = '',
        },
      ],
    } = JSON.parse(request.body);

    // Accessing the collection
    const collection = db.collection('cart');

    // Creating ObjectId instance for user's _id
    const objectId = new ObjectId(userId);

    // Finding the user's cart
    const userCart = await collection.findOne({ _id: objectId });

    if (userCart) {
     

      await collection.updateOne(
        { _id: objectId },
        { $push: { CartItems: {
          name,
          price,
          quantity,
          totalOrderPrice,
          quantityOrdered,
          isSelected,
          dateAdded,
          timeAdded
        }}}
      );

      response.status(200).json({
        message: 'Cart item successfully added to user\'s cart',
        CartItems: {
          name,
          price,
          quantity,
          totalOrderPrice,
          quantityOrdered,
          isSelected,
          dateAdded,
          timeAdded
        },
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
