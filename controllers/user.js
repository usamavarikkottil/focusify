import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js"

dotenv.config();



export const deleteUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findByIdAndDelete(id).exec();
        res.json({ "success": true, user });

    } catch (error) {
        res.status(401).json({ "success": false, "message": error.message });


    }


}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { email, password } = req.body;

        //Check if the user with the provided email already exists
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ "success": false, "message": `A user with the email ${email} already exist` });
        }


        const user = await User.findByIdAndUpdate(id, { email, password }, { new: true });
        res.json({ "success": true, user });
    }

    catch (err) {
        res.status(401).json({ "success": false, "message": err.message })
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).exec();
    res.send(user);
};

export const getUsers = async (req, res) => {
    const users = await User.find({});
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
    try {
        // accepts user queries
        const { email, password } = req.body;

        //check if the necessary inputs have provided by the user.
        if (!(email && password)) {
            res.status(400).json({ "status": false, "message": "All input is required" });
        }


        //Check if the email has already used by any other user.
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ "success": false, "message": `User with the email ${email} Already Exist. Please Login.` });
        }


        // creates a new user with the email and password
        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password
        });


        // creates a new jwt token for the newly created user
        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_KEY
        );

        // return the new user with a jwt token
        res.status(201).json({ "success": true, user, token });
    }

    catch (err) {
        res.status(403).json({ "success": false, "message": err.message })
    }


};