import { users, posts, comments } from "../../../data";

export default function handler(req, res) {
    const { ids } = req.query;
    if(Array.isArray(ids)) {
        if(ids.length > 2) {
            return res.status(400).json({ error: "There cannot be more than two parameters "});
        }
        if(ids.length === 1) {
            const postId = ids[0];
            const postComments = comments.filter(comment => {
                return comment.postId == postId;
            });
            return res.status(200).json(postComments)
        }
        if(ids.length === 2) {
            const [postId, userId] = ids
            const postUserComments = comments.filter(comment => {
                return comment.postId == postId && comment.userId == userId
            })
            return res.status(200).json(postUserComments)
        }
    }
    return res.status(200).json(comments)
}