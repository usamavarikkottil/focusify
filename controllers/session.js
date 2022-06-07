import { User } from "../models/user.js";
import { Session } from "../models/session.js";



export const createSession = async (req, res) => {
    try {

        const { id } = req.user;
        // accepts user queries
        const { startTime, endTime } = req.body;


        //check if the necessary inputs have provided by the user.
        if (!(startTime && endTime)) {
            res.status(400).json({ "status": false, "message": "All inputs are required" });
        }


        // creates a new session
        const session = await Session.create({
            startTime,
            endTime,
            users: id
        });

        // Push the new session into the user's session schema
        const user = await User
            .findByIdAndUpdate(id, { $push: { sessions: session } }, { new: true })
            .populate("sessions")
            .exec();

        // return the new session details
        res.status(201).json({ "success": true, user });
    }

    catch (err) {
        // res.status(403).json({ "success": false, "message": err.message })
        console.error(err);
    }


};


export const deleteSession = async (req, res) => {
    try {
        // taking the session id from the request parameter
        const { id } = req.params;

        const session = await Session.findByIdAndDelete(id).exec();
        // console.log(session)
        res.json({ "success": true, "message": `${session} has been deleted` });

    } catch (error) {
        res.status(401).json({ "success": false, "message": error.message });
    }


}


export const getSession = async (req, res) => {

    try {
        const { id } = req.params;

        const session = await Session.findById(id).exec();
        res.json({ "success": true, session });

    } catch (error) {
        res.status(500).json({ "success": false, "message": error.message })
    }

};

export const getSessions = async (req, res) => {
    // list all sessions
    try {
        const sessions = await Session.find({});
        res.json({ "success": true, sessions });

    } catch (error) {
        res.status(500).json({ "success": false, "message": error.message })
    }
};


