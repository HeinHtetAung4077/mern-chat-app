import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import { app, server } from './socket/socket.js';

import connectToMongoDB from './db/connectToMongoDB.js';




dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with Json Payloads (From req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("Hello world!!");
});


server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is running on Port ${port}`);
});