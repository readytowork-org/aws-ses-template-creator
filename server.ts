import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import pingRouter from "./routes/ping"
import dotenv from "dotenv"

const app = express()
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

app.use(pingRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
