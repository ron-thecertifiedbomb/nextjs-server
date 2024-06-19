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
    const productId = req.query._id as string; 
    const payload = req.body.payload as string[]; 

    if (!ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Invalid product ID' });
      return;
    }

    if (!Array.isArray(payload) || payload.some(url => typeof url !== 'string')) {
      res.status(400).json({ message: 'Invalid payload format. Payload must be an array of strings.' });
      return;
    }

    const collection = client.db('storage').collection('products');

    const product = await collection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    console.log('Product Found', product);

    const result = await collection.updateOne(
      { _id: new ObjectId(productId) },
      { $addToSet: { imageUrls: { $each: payload } } }, 
    );

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: `Failed to update product with ID ${productId}` });
      return;
    }

    const updatedProduct = await collection.findOne({ _id: new ObjectId(productId) });

    res.status(200).json({
      message: 'Images added successfully',
      imageUrls: updatedProduct.imageUrls,
      product: updatedProduct,
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating image URLs', error: error.message });
  }
}
