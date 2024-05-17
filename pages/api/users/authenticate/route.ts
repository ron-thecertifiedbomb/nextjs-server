
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../dbConfig/dbConfig';


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


    const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email
    };

    // Create a token with expiration of 1 day
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    // // Set the token as an HTTP-only cookie
    // response.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

    // Create a JSON response indicating successful login
    response.status(200).json({ message: 'Authentication successful', token });
  } catch (error: any) {
    console.error('Error during login:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}
