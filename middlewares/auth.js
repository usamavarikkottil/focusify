import jwt from "jsonwebtoken";
import express from "express";


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    // console.log(token)

    if (!token) {
        return res.status(401).send("A valid token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        // console.log(req.user);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
