const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // If user exists, return the user
        if (user) {
          console.log(`Existing user found: ${user.displayName}`);
          return done(null, user);
        } 
        
        // If user doesn't exist, create a new user
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profileImage: profile.photos[0].value,
        };

        user = await User.create(newUser);
        console.log(`New user created: ${user.displayName}`);
        return done(null, user);
      } catch (error) {
        console.error("Error during Google OAuth strategy", error);
        return done(error, null);  // Ensure errors are handled properly
      }
    }
  )
);

// Google OAuth login route
router.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    if (req.user) {
      console.log("User authenticated successfully:", req.user);
      res.redirect("/dashboard");
    } else {
      console.error("User authentication failed");
      res.redirect("/login-failure");
    }
  }
);

// Login failure route
router.get("/login-failure", (req, res) => {
  res.status(401).render("login-failure", { message: "Login failed. Please try again." });
});

// Logout route with enhanced error handling
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out", err);
      return res.status(500).send("Error logging out.");
    } else {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session", err);
          return res.status(500).send("Error destroying session.");
        }
        console.log("Session destroyed, user logged out.");
        res.redirect("/");
      });
    }
  });
});

// Serialize user into the session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user.id);
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      console.log("Deserializing user:", user.displayName);
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (err) {
    console.error("Error deserializing user:", err);
    done(err, null);
  }
});

module.exports = router;
