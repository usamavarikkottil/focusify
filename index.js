import express from "express";
import userRoutes from "./routes/user.js"


const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/user", userRoutes)

app.get("/", (req, res) => {
    res.send("Hohoo");
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))