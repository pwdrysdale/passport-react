// https://www.youtube.com/watch?v=cD17CYA1dck

import express from "express";
import { createConnection } from 'typeorm'
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import authRoutes from './auth/routes'

export const startServer = async () => {

    dotenv.config();

    const app = express();

    await createConnection()

    // Middleware
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));


    // Auth
    app.use(
        session({
            secret: "this is the session secret",
            resave: true,
            saveUninitialized: true,
            cookie: {
                sameSite: false,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
            }
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/auth", authRoutes)


    app.listen(process.env.PORT || 4000, () => {
        console.log("Server started");
    });
}

startServer()