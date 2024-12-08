import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './global/config/DB.js';
// import SocketIO from './global/config/SocketIO';

import userRoutes from "./src/users/users.route.js"

dotenv.config();
connectDB();

const app = express();
// const server = SocketIO(app)

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus: 200 }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    console.log(req.path, req.method);
    next();
});

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to iRenta API",
    });
});

mongoose.connection.once("open", () => {
    console.log("Database connected.");

    app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`));
    // server.listen(process.env.PORT, () =>
    //     console.log(`Server started on port ${process.env.PORT}`)
    // );
});

