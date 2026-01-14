import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { VerifyCallback } from "passport-oauth2";
import User, { IUser } from "../models/user.model";
import dotnev from "dotenv";

dotnev.config({ path: "../.env" });
/* How to store the user information in the session */
passport.serializeUser((user: Express.User, done) => {
  const typedUser = user as IUser;
  done(null, typedUser._id);
});

/* How to retrieve the user from the session */
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || null);
  } catch (error) {
    done(error as Error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          user.accessToken = accessToken;
          if (refreshToken) user.refreshToken = refreshToken;
          await user.save();
        } else {
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
      } catch (error) {
        done(error as Error, undefined);
      }
    }
  )
);

export default passport;
