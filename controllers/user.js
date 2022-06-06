import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js"

dotenv.config();



export const deleteUser = async (req, res) => {
    try {
        // taking the user id from the jwt token of the loggedin user
        const { id } = req.user;

        const user = await User.findByIdAndDelete(id).exec();
        res.json({ "success": true, "message": `${user} account has been deleted` });

    } catch (error) {
        res.status(401).json({ "success": false, "message": error.message });
    }


}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { email, password } = req.body;

        //Check if the email has already used by any other user.
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ "success": false, "message": `A user with the email ${email} already exist` });
        }

        //updates the user details and return the user after the updation
        const user = await User.findByIdAndUpdate(id, { email, password }, { new: true });
        res.json({ "success": true, user });
    }

    catch (err) {
        res.status(401).json({ "success": false, "message": err.message })
    }
}

export const getUser = async (req, res) => {
    // Outputs the user details of an user.

    // ** TODO **: Should return full user details only if the user id matches with the jwt token userID. 
    try {
        const { id } = req.params;

        const user = await User.findById(id).exec();
        res.json({ "success": true, user });

    } catch (error) {
        res.status(500).json({ "success": false, "message": error.message })
    }

};

export const getUsers = async (req, res) => {
    // list all users
    try {
        const users = await User.find({});
        res.json({ "success": true, users });

    } catch (error) {
        res.status(500).json({ "success": false, "message": error.message })
    }
};


export const loginUser = async (req, res) => {

    try {

        // accepts user queries
        const { email, password } = req.body;

        //check if the necessary inputs have provided by the user.
        if (!(email && password)) {
            res.status(400).json({ "status": false, "message": "All input is required" });
        }


        //Check if the email has registered.
        const user = await User.findOne({ email });
        if (user) {
            if (user.password == password) {

                // creates a new jwt token for the loggedin user
                const token = jwt.sign({ id: user.id, email: user.email },
                    process.env.JWT_KEY
                );

                // return the loggedin user with a jwt token
                res.status(200).json({ "success": true, user, token });

            } else {

                // Incorrect password response
                res.status(401).json({ "success:": false, "message": `Wrong password for ${email}` });
            }
        } else {

            // User not found response
            res.status(404).json({ "success": false, "message": `User with the email ${email} does not exist` });
        }
    } catch (error) {
        res.status(500).json({ "success": false, "message": error.message })
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