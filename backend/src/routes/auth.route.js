import { Router } from "express";
import {
    login,
    logout,
    signup,
    updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute, checkAuth } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

// /check should be usable by anonymous clients; it simply returns the
// current user if a valid cookie is present, otherwise null.  Avoid
// applying protectRoute so we don't trigger a 401 every time the
// frontend checks auth on page load.
router.get("/check", checkAuth);

export default router;
