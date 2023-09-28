import dotenv from "dotenv"
import express from "express"
import authRoute from "./authRoute.js"
import connectDB from "./db.js"

dotenv.config()

//database connect
connectDB()

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use("/api", authRoute)

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`App is running on port ${port}`)
})
