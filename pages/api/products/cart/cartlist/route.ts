import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "../../../../../dbConfig/dbConfig";


export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('cart');

   
    const { userId = '', CartItems = [] } = JSON.parse(request.body);

  
    const document = {
      userId: userId,
      CartItems: CartItems,
    };

    
    const result = await collection.insertOne(document);

    response.status(201).json({
      message: 'Document created successfully',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating document:', error);
    response.status(500).json({ message: 'Error creating document', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
