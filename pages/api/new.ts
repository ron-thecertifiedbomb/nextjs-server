import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
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
    const db = client.db('my_cart_database');
    const collection = db.collection('users'); // Update collection name if necessary

    // Extract user data from request body with default values
    const {
      username = '',
      password = '',
      firstname = '',
      lastname = '',
      dateofbirth = new Date(),
      address = '',
      contactno = '',
      email = ''
    } = request.body;

    // Check if the username or email already exists

    const existingUser = await collection.findOne({ username });
    const existingEmail = await collection.findOne({ email });

    if (existingUser) {
      console.error("Username already exists:", username);
      return response.status(409).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      console.error("Email already exists:", email);
      return response.status(409).json({ error: "Email already exists" });
    }

    // Check if the password is provided
    if (!password) {
      console.error("Password is required");
      return response.status(400).json({ error: "Password is required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user profile into the collection
    await collection.insertOne({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      dateofbirth,
      address,
      contactno,
      email,
    });

    // Return success response
    response.status(201).json({ message: 'User profile created successfully' });
  } catch (error) {
    // If an error occurs, log the error and return an Internal Server Error response
    console.error('Error creating user profile:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
}
