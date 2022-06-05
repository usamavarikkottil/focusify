import { v4 as uuidv4 } from "uuid";


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
    let foundUser = users.find(user => user.email == email);
    if (foundUser) {
        if (foundUser.password == password) {

            res.send(`User login for ${email} is successful..`)
        } else {
            res.send(`Wrong password for ${email}`);
        }
    } else {
        res.send(`User with the email ${email} does not exist`)
    }

}


export const createUser = (req, res) => {
    const user = req.body;
    // const userId=uuidv4();
    users.push({ ...user, id: uuidv4() });
    res.send(`The user with email ${user.email} has been addedd succesfully`);

};