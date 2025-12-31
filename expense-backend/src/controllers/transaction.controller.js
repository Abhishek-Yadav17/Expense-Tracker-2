import Transaction from "../models/Transaction.js"

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    userId: req.user._id,
  }).sort({ createdAt: -1 })

  res.json(transactions)
}

export const addTransaction = async (req, res) => {
  const { type, amount, date, category, note, attachmentId } = req.body

  if (!type || amount == null || !date || !category) {
    return res.status(400).json({ message: "Missing fields" })
  }

  const transaction = await Transaction.create({
    userId: req.user._id,
    type,
    amount,
    date,
    category,
    note,
    attachmentId: attachmentId || null,
  })

  res.json(transaction)
}


export const deleteTransaction = async (req, res) => {
  await Transaction.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  })

  res.json({ success: true })
}
