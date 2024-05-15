import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

// MongoDB connection URI
const mongoURI = 'your_mongo_uri';

// Function to establish MongoDB connection
async function connectToDatabase() {
  const client = new MongoClient(mongoURI);
  await client.connect();
  console.log('Connected to MongoDB');
  return client;
}

// Error messages
const ERROR_MESSAGES = {
  DUPLICATE_USERNAME: 'Username already exists',
  DUPLICATE_EMAIL: 'Email already exists',
  MISSING_PASSWORD: 'Password is required',
  INTERNAL_ERROR: 'Internal Server Error',
};

// Middleware to handle CORS
function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Respond to preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
}

// Define the API route handler for POST requests
export default async (request: NextApiRequest, response: NextApiResponse) => {
  let client;

  try {
    // Apply CORS middleware
    corsMiddleware(request, response, () => {});

    // Connect to MongoDB
    client = await connectToDatabase();

    // Access the database and collection
    const db = client.db('my_cart_database');
    const collection = db.collection('storage'); // Update collection name if necessary

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
      return response.status(409).json({ error: ERROR_MESSAGES.DUPLICATE_USERNAME });
    }

    if (existingEmail) {
      console.error("Email already exists:", email);
      return response.status(409).json({ error: ERROR_MESSAGES.DUPLICATE_EMAIL });
    }

    // Check if the password is provided
    if (!password) {
      console.error("Password is required");
      return response.status(400).json({ error: ERROR_MESSAGES.MISSING_PASSWORD });
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
    response.status(500).json({ error: ERROR_MESSAGES.INTERNAL_ERROR });
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
};
