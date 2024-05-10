import { users } from "../../../data";
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_SECRET_KEY;

export default function handler(req, res) {
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({ error: "The authorization header is required" });
    const token = authorization.split(' ')[1];
    
    jwt.verify(token, JWT_KEY, (err, payload) => {
        if(err) return res.status(401).json({ error: "Unauthorized" });
        return res.status(200).json(users.map(user => {
            return { ...user, password: ''}
        }));
    });
}