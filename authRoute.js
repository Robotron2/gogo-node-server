import express from "express"
import { loginController, registerController } from "./controllers/authController.js"

const router = express.Router()

//Sign in route
router.post("/register", registerController)

//Login route
router.post("/login", loginController)

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
