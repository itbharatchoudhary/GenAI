const { Router } = require("express")
const authController = require("../controller/Auth.controller");
const AuthMiddleware = require("../middleware/Auth.middleware");

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
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user detail
 * @access private
 */
authRouter.get("/get-me", AuthMiddleware.authUser , authController.getMeUserController)


module.exports = authRouter;
