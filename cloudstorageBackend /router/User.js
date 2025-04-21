const e = require('express');
const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');

// Route for Google authentication
router.route('/google')
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.route('/google/callback')
    .get(passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }), (req, res) => {
        res.redirect("http://localhost:5173/");
    });

// Logout route
router.route('/logout')
    .get((req, res) => {
        req.logout((err) => {
            if (err) return res.status(500).json({ error: "Logout failed" });
            req.session.destroy(() => {
                res.redirect("http://localhost:5173/login");
            });
        });
    });

// User route
router.route('/user')
    .get((req, res) => {
      return req.user ? res.status(200).json(req.user) :  res.status(200).json(null);
    });

module.exports = router;
