import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // cookie configuration varies between development and production
    // - production needs secure + SameSite=None for cross-site requests
    // - development uses http (so secure must be false).
    const cookieOptions = {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.cookie("jwt", token, cookieOptions);
    return token;
};
