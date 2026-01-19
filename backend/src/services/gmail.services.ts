import { google } from "googleapis";
import User from "../models/user.model";

export const gmailClient = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user || !user.accessToken || !user.refreshToken) {
    throw new Error("User tokens not found");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
};
