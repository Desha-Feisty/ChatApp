import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "no token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protect route", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// this version of "checkAuth" can be called by an unauthenticated
// visitor. it attempts to read the jwt cookie, and if a valid user is
// found returns it; otherwise it simply responds with null.  it never
// sends a 4xx/5xx status so that client-side hooks don't treat a
// non‑logged‑in state as an error.
export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(200).json(null);
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(200).json(null);
        }

        if (!decoded?.userId) {
            return res.status(200).json(null);
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(200).json(null);
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in checkAuth Controller", error.message);
        res.status(200).json(null);
    }
};
