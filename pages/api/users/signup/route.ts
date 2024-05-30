import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../dbConfig/dbConfig";

export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let client;

  try {
    client = await connectToDatabase();
    const db = client.db("storage");
    const usersCollection = db.collection("users");

    const {
      firstname = "",
      lastname = "",
      username = "",
      mobile = "",
      email = "",
      password = "",
      gender = "",
      birthday = "",
    } = request.body;

    const cartsCollection = db.collection("cart");
    const addressCollection = db.collection("address");

    const existingUser = await usersCollection.findOne({ username });
    const existingEmail = await usersCollection.findOne({ email });

    if (existingUser) {
      console.error("Username already exists:", username);
      return response.status(409).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      console.error("Email already exists:", email);
      return response.status(409).json({ error: "Email already exists" });
    }

    if (!password) {
      console.error("Password is required");
      return response.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const philippinesTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const [date, time] = philippinesTime.split(", ");

    const dateCreatedServer = new Date(date).toISOString();
    const timeCreatedServer = time;

    const newUser = {
      firstname,
      lastname,
      username,
      mobile,
      email,
      password: hashedPassword,
      gender,
      birthday,
      dateCreated: dateCreatedServer,
      timeCreated: timeCreatedServer,
    };

    await usersCollection.insertOne(newUser);

    const user = await usersCollection.findOne(
      { username },
      { projection: { firstname: 1, lastname: 1, email: 1 } }
    );

    if (!user) {
      console.error("User not found with username:", username);
      return response.status(404).json({ error: "User not found" });
    }

    const {
      _id: _id,
      firstname: userFirstname,
      lastname: userLastname,
      email: userEmail,
    } = user;

    const CartListSchema = {

      ownerId: _id,
      firtname: userFirstname,
      lastname: userLastname,
      email: email,
      CartItems: [],
    };

    const AddressListSchema = {
      ownerId: _id,
      firtname: userFirstname,
      lastname: userLastname,
      email: email,
      AddressList: [],
    };

    await cartsCollection.insertOne(CartListSchema);
    await addressCollection.insertOne(AddressListSchema);


    response.status(201).json({

      _id: _id,
      firstname: userFirstname,
      lastname: userLastname,
      email: userEmail,
      message: "User cart list created successfully",

    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    response.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
