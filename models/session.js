import { mongoose } from "mongoose";
import { User } from "./user.js"
const { Schema, model } = mongoose;

const sessionSchema = new Schema({

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const Session = model("Session", sessionSchema);