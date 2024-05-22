import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    // Handle GET request
    // For example, return a list of products
    return response.status(200).json({ message: 'GET request is allowed' });
  }

  if (request.method !== 'PUT') {
    response.setHeader('Allow', ['PUT']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('products');
    const productId = request.query._id as string;
    const updateData = JSON.parse(request.body);

    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!updatedProduct.value) {
      response.status(404).json({ message: 'Product not found' });
      return;
    }

    response.status(200).json({ message: 'Product updated successfully', updatedProduct: updatedProduct.value });
  } catch (error) {
    console.error('Error updating product:', error);
    response.status(500).json({ message: 'Error updating product', error: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
