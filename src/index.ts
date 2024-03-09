import express from 'express';
import authRouter from './v1/routes/auth.routes';

const application = express();

application.use(express.json());

application.use('/api/v1/auth', authRouter);

application.get("/", (req, res) => {
    res.status(200).send("Welcome to Virtual event management system!")
});

export default application;