const userModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/Blacklist.model")

/**
 * @name registerUserController
 * @description To create Register of new user
 * @requires Username,email,password In the request body
 * @access public
 */


async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: " Please provide username, email and password"

        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: " Account already exist with this email address"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: " User registers successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description to login a user
 * @requires email and Password in the request body
 * @access public 
 */

async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: " Invalid email or password"
        })
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password)

    if (!isPasswordVaild) {
        return res.status(400).json({
            message: " Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: " User loggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description to logout a user
 * @access public 
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out Succssfully"
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
}