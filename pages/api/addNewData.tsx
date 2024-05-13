import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// MongoDB connection URI
const mongoURI = 'mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/my_cart_database?retryWrites=true&w=majority';

// Function to establish MongoDB connection
async function connectToDatabase() {
  const client = new MongoClient(mongoURI);
  await client.connect();
  console.log('Connected to MongoDB');
  return client;
}

// Define the API route handler
export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    // Connect to MongoDB
    client = await connectToDatabase();

    // Access the database and collection
    const db = client.db('storage');
    const collection = db.collection('coffee'); 

    // Extract coffee data from the request body
    const coffeeData = request.body;

    // Process price data
    if (coffeeData && coffeeData.prices) {
      coffeeData.prices.forEach((price, index) => {
        const fieldName = `price-${index}`;
        if (coffeeData[fieldName] !== undefined) {
          price.price = coffeeData[fieldName];
          delete coffeeData[fieldName]; // Remove the price field from the main coffee data object
        }
      });
    }

    // Insert the coffee object into the collection
    await collection.insertOne(coffeeData);

    // Return success response
    response.status(201).json({ message: 'Coffee added successfully' });
  } catch (error) {
    // If an error occurs, log the error and return an Internal Server Error response
    console.error('Error adding coffee:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
}