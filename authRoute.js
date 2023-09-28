import express from "express"
import { loginController, registerController } from "./controllers/authController.js"
import { requireSignIn } from "./middleware/authMiddleware.js"

const router = express.Router()

//Sign in route
router.post("/register", registerController)

//Login route
router.post("/login", loginController)

router.get("/user-auth", requireSignIn, (req, res) => {
	res.status(200).send({ ok: true })
})

export default router

// {
//     "userEmail": "greyhat@gmail.com",
//     "userPassword": "123!@#ABCabc"
//   }
// {
//     "userEmail": "greyhat@gmail.com",
//     "userPassword": "123!@#ABCabc",
//     "userName": "greyy"
//   }
