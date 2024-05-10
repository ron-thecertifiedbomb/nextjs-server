import { posts } from "../../data";

export default function handler(req, res) {
    const { limit } = req.query;
    res.status(200).json(posts.slice(0, limit));
}