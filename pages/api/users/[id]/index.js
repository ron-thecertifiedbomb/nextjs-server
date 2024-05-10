import { users } from "../../../../data";

export default function handler(req, res) {
    const { id } = req.query
    const user = users.find(user => {
       return user.id == id
    })
    if(typeof user !== 'undefined') return res.status(200).json(user)
    res.status(404).json({ error: "Not found"})
}