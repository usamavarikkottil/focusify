import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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


export const loginUser = (req, res) => {
    const { email, password } = req.body;
    let user = users.find(person => person.email == email);
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


export const createUser = (req, res) => {
    let user = req.body;
    user = { ...user, id: uuidv4() };
    users.push(user);
    // console.log(user)

    const token = jwt.sign({ id: user.id, email: user.email },
        process.env.JWT_KEY
    );
    // save user token
    // user.token = token;

    // return new user
    res.status(201).json({ user, token });

};