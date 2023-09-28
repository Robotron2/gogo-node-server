import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import validator from "validator"
import { UserModel } from "./../models/userModel.js"

const createToken = (_id) => {
	return JWT.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export const registerController = async (req, res) => {
	// console.log("Sign in logic here")
	const { userName, userPassword, userEmail } = req.body

	try {
		// validation
		if (!userName || !userEmail || !userPassword) {
			throw Error("All fields must be filled!")
		}
		if (!validator.isEmail(userEmail)) {
			throw Error("Email is not valid")
		}
		if (!validator.isStrongPassword(userPassword)) {
			throw Error("Password is not strong enough. Password should have at least a symbol, Uppercase and lowercase letters, a number")
		}

		const exists = await UserModel.findOne({ email: userEmail })

		if (exists) {
			throw Error("Email exists")
		}

		const saltRound = 10

		const salt = await bcrypt.genSalt(saltRound)
		const hash = await bcrypt.hash(userPassword, salt)

		const user = await UserModel.create({
			email: userEmail,
			password: hash,
			username: userName
		})

		//create token
		const token = createToken(user._id)
		const userData = { email: user.email, id: user._id, username: user.username }
		res.status(200).json({ userData, token, success: true, message: "Registered successfuly!" })
	} catch (error) {
		res.status(400).json({ error: error.message, success: false })
	}
}

export const loginController = async (req, res) => {
	const { userPassword, userEmail } = req.body

	try {
		//validation
		if (!userEmail || !userPassword) {
			throw Error("All fields must be filled!")
		}

		const user = await UserModel.findOne({ email: userEmail })
		console.log(user)

		if (!user) {
			throw Error("Incorrect email")
		}

		const match = await bcrypt.compare(userPassword, user.password)
		if (!match) {
			throw Error("Incorrect password")
		}

		//create token
		const token = createToken(user._id)
		const userData = { email: user.email, id: user._id, username: user.username }

		res.status(200).json({ userData, token, success: true, message: "Logged in successfuly!" })
	} catch (error) {
		res.status(400).json({ error: error.message, success: false })
	}
}
