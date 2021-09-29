// https://www.youtube.com/watch?v=cD17CYA1dck

import express from "express";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import session from "express-session";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import authRoutes from "./auth/routes";
import { Me } from "./modules/Me";

export const startServer = async () => {
    try {
        // secrets
        dotenv.config();

        // start an app
        const app = express();

        // db
        await createConnection();

        // Middleware
        app.use(express.json());
        app.use(cors({ origin: "http://localhost:3000", credentials: true }));

        // Auth
        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: true,
                saveUninitialized: true,
                cookie: {
                    sameSite: false,
                    secure: false,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
                },
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());
        app.use("/auth", authRoutes);

        // Cors
        const allowedOrigins = [
            "https://studio.apollographql.com",
            "https://studio.apollographql.com",
            "http://localhost:3000",
            "http://localhost:4000/graphql",
            "http://localhost:4000",
        ];

        const corsOptions: CorsOptions = {
            credentials: true,
            origin: (origin, callback) => {
                if (allowedOrigins.includes(origin || "invalid"))
                    return callback(null, true);

                callback(new Error(`Not allowed by CORS: ${origin}`));
            },
        };

        app.use(cors(corsOptions));

        // GraphQL
        const schema = await buildSchema({
            resolvers: [Me],
        });

        const server = new ApolloServer({
            schema,
            context: ({ req, res }) => {
                return { req, res };
            },
            formatResponse: (response, requestContext) => {
                if (requestContext.response && requestContext.response.http) {
                    requestContext.response.http.headers.set(
                        "Access-Control-Allow-Origin",
                        "http://localhost:3000"
                    );
                    requestContext.response.http.headers.set(
                        "Access-Control-Allow-Credentials",
                        "true"
                    );
                }
                return response;
            },
        });
        await server.start();
        server.applyMiddleware({ app });

        // Get 'er up!
        app.listen(process.env.PORT || 4000, () => {
            console.log("Server started");
        });

        return { server, app };
    } catch (err) {
        console.log("No server today..");
        console.log(err);
    }
};

startServer();
