const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ihsnindia.vercel.app',
    'https://ihsn.in',
  ],
  credentials: true,
}))

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use('/api/magazine', require("./routes/magazine"));
app.use("/api/contact", require("./routes/contact"));

app.get("/", (req, res) => {
    res.json({ message: "Backend is Running" });
})



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is Running on port ${process.env.PORT || 5000}`)
        })

    })

    .catch((err) => {
        console.error("MongoDb Connection Failed", err)
    })

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})