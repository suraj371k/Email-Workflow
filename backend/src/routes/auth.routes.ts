import { Router, Request, Response, NextFunction } from "express";
import passport from "../config/passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "openid",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.readonly",
      // "https://www.googleapis.com/auth/gmail.send",
      // "https://www.googleapis.com/auth/gmail.googlemail",
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/dashboard",
  })
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
});

export default router;
