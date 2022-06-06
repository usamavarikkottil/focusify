import { mongoose } from "mongoose";
const { Schema, model } = mongoose;

const sessionSchema = new Schema({

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

export const Session = model("Session", sessionSchema);