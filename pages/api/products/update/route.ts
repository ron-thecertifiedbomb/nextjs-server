import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers (adjust as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = await connectToDatabase();
    const productId = req.query._id as string; // Assuming productId is a string
    const payload = req.body.payload; // Assuming payload is an array of strings

    console.log('Payload from Redux', payload);

    if (!productId || typeof productId !== 'string') {
      res.status(400).json({ message: 'Product ID is required' });
      return;
    }

    if (!payload || !Array.isArray(payload) || payload.some(url => typeof url !== 'string')) {
      res.status(400).json({ message: 'Invalid payload format. Payload must be an array of strings.' });
      return;
    }

    const collection = client.db('storage').collection('products');

    // Update the imageUrls field in the product document
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(productId) }, // Convert productId to ObjectId for MongoDB
      { $addToSet: { imageUrls: { $each: payload } } }, // Use $each to add multiple elements to array
      { returnDocument: 'after' } // To get the updated document
    );

    if (!result.value) {
      res.status(404).json({ message: `Product with ID ${productId} not found` });
      return;
    }

    
    res.status(200).json({
      message: 'Image URLs added successfully',
      imageUrls: result.value.imageUrls,
      product: result.value,
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating image URLs', error: error.message });
  }
}
