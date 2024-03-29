import express from "express";
import JSONSyntaxErr from "json-syntax-error";
import userRoutes from "./routes/user.js"
import sessionRoutes from "./routes/session.js"

import { connect as dbconnect } from "./config/database.js";


dbconnect();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(JSONSyntaxErr());
app.use("/user", userRoutes)
app.use("/session", sessionRoutes)
app.get("/", (req, res) => {
    res.send("Hohoo readyyy");
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))