import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    attachmentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Transaction", transactionSchema)
