import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model";
import dotnev from "dotenv";
dotnev.config({ path: "../.env" });
/* How to store the user information in the session */
passport.serializeUser((user, done) => {
    const typedUser = user;
    done(null, typedUser._id);
});
/* How to retrieve the user from the session */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user || null);
    }
    catch (error) {
        done(error, null);
    }
});
// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
            user.accessToken = accessToken;
            if (refreshToken)
                user.refreshToken = refreshToken;
            await user.save();
        }
        else {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails?.[0]?.value,
                displayName: profile.displayName,
                accessToken,
                provider: "google",
                refreshToken,
            });
        }
        done(null, user);
    }
    catch (error) {
        done(error, undefined);
    }
}));
export default passport;
