const { Router } = require("express")
const authController = require("../controller/Auth.controller");

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description To register a new user
 * @requires Username,email,password
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description To login a  user
 * @requires Username/email,password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Clear token from  user cookie And add the token into blacklist
 * @access Public
 */
authRouter.post("/logout", authController.logoutUserController)

module.exports = authRouter;
