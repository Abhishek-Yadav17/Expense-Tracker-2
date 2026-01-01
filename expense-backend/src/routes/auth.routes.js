import express from "express"
import { body } from "express-validator"
import { register, login, me } from "../controllers/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.post(
    "/register",
    [
        body("name").trim().isLength({ min: 2 }).withMessage("Name too short"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password1")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters"),
    ],
    register
)

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").exists().withMessage("Password required"),
    ],
    login
)

router.get("/me", authMiddleware, me)

export default router
