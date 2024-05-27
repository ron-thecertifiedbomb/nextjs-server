import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db('storage');
    const collection = db.collection('users');

    const {
      username = '',
      password = '',
    } = request.body;

    if (!username || !password) {
      return response.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = await collection.findOne({ username });

    if (!existingUser) {
      console.error("Username does not exist:", username);
      return response.status(409).json({ error: "Username does not exist" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return response.status(400).json({ error: "Invalid password" });
    }

    const getCurrentTime = (): number => {
      return new Date().getTime();
    };

    const currentTime = getCurrentTime();
    const formattedLastLoggedIn = new Date(currentTime).toLocaleString('en-PH', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true // Use 12-hour clock
    });
    
     await collection.findOneAndUpdate(
      {
        _id: existingUser._id
      },
      { 
        $set: { lastLoggedIn: formattedLastLoggedIn } 
      },
      { 
        returnDocument: "after",
        upsert: true // Add this option to create the document if it doesn't exist
      }
    );

    

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      lastLoggedIn: formattedLastLoggedIn // Update to use currentTime
    };

    // Create a token with expiration of 1 day
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    // Create a JSON response indicating successful login
    response.status(200).json({ message: 'Authentication successful', userId: existingUser._id, lastLoggedInTime: formattedLastLoggedIn, token });
  } catch (error: any) {
    console.error('Error during login:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}
