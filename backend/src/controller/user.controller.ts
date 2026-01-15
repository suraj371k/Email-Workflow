import { Request , Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "unauthorize , please login" });
    }

    const user = req.user as any;

    console.log("user: ", user);
    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        provider: user.provider,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.log("Error in get me controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
