import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "Select type",
  }),
  category: z.string().min(1, "Category required"),
  amount: z.coerce.number().positive("Amount must be > 0"),
  date: z.string().min(1, "Date required"),
  note: z.string().optional(),
})

const TransactionModal = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "expense",
    },
  })

  if (!open) return null

  const submit = async (data) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-6 text-gray-900">
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
            <select
              {...register("type")}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Category</label>
            <select
              {...register("category")}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="General">General</option>
              <option value="Food">Food</option>
              <option value="Groceries">Groceries</option>
              <option value="Travelling">Travelling</option>
              <option value="Bills">Bills</option>
            </select>
            <p className="text-red-500 text-xs mt-1">
              {errors.category?.message}
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Amount</label>
            <input
              type="number"
              {...register("amount")}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.amount?.message}
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Date</label>
            <input
              type="date"
              {...register("date")}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.date?.message}
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Note</label>
            <input
              {...register("note")}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-black text-white py-2 text-sm hover:bg-gray-900 transition disabled:opacity-60"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
