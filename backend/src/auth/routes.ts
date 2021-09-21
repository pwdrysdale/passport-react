import { Router } from "express"
import { User } from "../entities/Use";
const passport = require("passport")
const passportSetup = require('./functions')

const router = Router()

router.get("/google", (req, res, next) => {
    passport.authenticate("google", { scope: ["profile"] })(req, res, next);
});

router.get(
    "/google/callback",
    passport.authenticate(
        "google",
        { failureRedirect: "/login", session: true }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

router.get("/twitter", (req, res, next) => {
    passport.authenticate("twitter")(req, res, next);
});

router.get(
    "/twitter/callback",
    passport.authenticate(
        "twitter",
        { failureRedirect: "/login", session: true }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

router.get("/github", (req, res, next) => {
    passport.authenticate("github")(req, res, next);
});

router.get(
    "/github/callback",
    passport.authenticate(
        "github",
        { failureRedirect: "/login", session: true }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }

);

router.get("/me", (req, res) => {
    res.send(req.user);
});


router.get("/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.send("done");
    }
})

export default router