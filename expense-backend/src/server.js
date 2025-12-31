import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"

dotenv.config()

connectDB()

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-tracker-2-one.vercel.app",
    ],
    credentials: true,
  })
)
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
