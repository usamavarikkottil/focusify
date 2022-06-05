import express from "express";

const router = express.Router();

const users = [
    {
        email: "hello@gmail.com",
        password: "123"
    }
]

router.get("/", (req, res) => {
    res.json(users);

})

router.post("/", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`The user with email ${user.email} has been addedd succesfully`);

})

export default router;