import dotenv from "dotenv"
import express from "express"
import authRoute from "./authRoute.js"
import connectDB from "./db.js"

dotenv.config()

//database connect
connectDB()

const app = express()

app.use(express.json())

app.use("/api", authRoute)

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`App is running on port ${port}`)
})
