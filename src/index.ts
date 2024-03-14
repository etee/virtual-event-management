import express from 'express';
import authRouter from './v1/routes/auth.routes';
import eventRouter from './v1/routes/event.routes';

const application = express();

application.use(express.json());

application.use('/api/v1/auth', authRouter);

application.use('/api/v1/events', eventRouter);

application.get("/", (req, res) => {
    res.status(200).send("Welcome to Virtual event management system!")
});

export default application;