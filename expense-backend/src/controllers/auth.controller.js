import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"

export const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }

  const { name, email, password1 } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" })
  }

  const hashedPassword = await bcrypt.hash(password1, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  )

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "Invalid creds" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid creds" })
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  )

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  })
}

export const me = async (req, res) => {
  res.json(req.user)
}
