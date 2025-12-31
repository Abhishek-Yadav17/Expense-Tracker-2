import express from "express"
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(authMiddleware)

router.get("/", getTransactions)
router.post("/", addTransaction)
router.delete("/:id", deleteTransaction)

export default router
