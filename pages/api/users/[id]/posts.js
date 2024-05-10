import { users, posts } from "../../../../data";

export default function handler(req, res) {
    const { id } = req.query
    const user = users.find(user => {
       return user.id == id
    })
    if(typeof user === 'undefined') return res.status(404).json({ error: "Not found"})

    const userPosts = posts.filter(post => {
        return post.userId == id
    })

    res.status(200).json(userPosts)
}