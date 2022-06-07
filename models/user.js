import { mongoose } from "mongoose";
import { Session } from "./session.js"
const { Schema, model } = mongoose;

const userSchema = new Schema({
    // first_name: { type: String, default: null },
    // last_name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    sessions: [{ type: Schema.Types.ObjectId, ref: Session }]
});

export const User = model("User", userSchema);