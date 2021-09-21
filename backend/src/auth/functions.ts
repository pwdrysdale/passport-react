import passport from 'passport';
import { User } from '../entities/Use';
const dotenv = require('dotenv')

dotenv.config()

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

passport.serializeUser(async (user: any, done: any) => {
    const { id } = user
    return done(null, id)
});

passport.deserializeUser(async (id: any, done: any) => {
    try {
        const u = await User.findOne(id)
        return done(null, u)
    } catch (err) {
        return done(err, null)
    }

})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },

        async (accessToken, refreshToken, profile, cb) => {

            try {
                const doc = await User.findOne({ googleId: profile.id })

                if (!doc) {
                    const newUser = User.create({
                        googleId: profile.id,
                        username: profile.name.givenName,
                    });
                    await newUser.save();
                    cb(null, newUser)
                }

                cb(null, doc)

            } catch (err) {
                return cb(err, null);
            }
        }

    )

)


passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: "/auth/twitter/callback",
        },

        async (accessToken, refreshToken, profile, cb) => {
            try {
                const doc = await User.findOne({ twitterId: profile.id })

                if (!doc) {
                    const newUser = User.create({
                        twitterId: profile.id,
                        username: profile.username,
                    });
                    await newUser.save();
                    cb(null, newUser)
                }

                cb(null, doc)

            } catch (err) {
                return cb(err, null);
            }
        }

    )

)

passport.use(
    new GitHubStrategy(
        {
            clientID: `${process.env.GITHUB_CLIENT_ID}`,
            clientSecret: `${process.env.GITHUB_CLIENT_SECRET
                }`,
            callbackURL: "/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const doc = await User.findOne({ githubId: profile.id })

                if (!doc) {
                    const newUser = User.create({
                        githubId: profile.id,
                        username: profile.username,
                    });
                    await newUser.save();
                    cb(null, newUser)
                }

                cb(null, doc)

            } catch (err) {
                return cb(err, null);
            }
        }

    )

)

