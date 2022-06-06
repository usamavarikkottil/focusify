import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js"

dotenv.config();

let users = [];

export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id != id);
    res.send(`User with the ${id} got deleted..`)
}


export const updateUser = (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    let foundUser = users.find(user => user.id == id);
    // console.table([email, password])

    foundUser.email = email;
    foundUser.password = password;


    res.send(foundUser);
}

export const getUser = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id == id);

    res.send(foundUser);
};

export const getUsers = (req, res) => {
    res.json(users);

};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).json({ "status": false, "message": "All input is required" });
    }
    // let user = users.find(person => person.email == email);
    const user = await User.findOne({ email });
    if (user) {
        if (user.password == password) {

            const token = jwt.sign({ id: user.id, email: user.email },
                process.env.JWT_KEY
            );
            res.status(200).json({ user, token });
        } else {
            res.send(`Wrong password for ${email}`);
        }
    } else {
        res.send(`User with the email ${email} does not exist`)
    }

}


export const createUser = async (req, res) => {
    /* let user = req.body;
    user = { ...user, id: uuidv4() };
    users.push(user); */
    // console.log(user)
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ "status": false, "message": "All input is required" });
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ "success": false, "message": "User Already Exist. Please Login" });
        }


        const user = await User.create({

            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password
        });

        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_KEY
        );


        // return new user
        res.status(201).json({ "success": true, user, token });
    }

    catch (err) {
        res.status(403).json({ "success": false, "message": err.message })
    }


};