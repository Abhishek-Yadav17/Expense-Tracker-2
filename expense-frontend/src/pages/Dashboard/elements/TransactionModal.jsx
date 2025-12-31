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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-3"
        >
          <div>
            <label className="text-sm">Type</label>
            <select
              {...register("type")}
              className="w-full border p-2 rounded"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Category</label>
            <input
              {...register("category")}
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-xs">
              {errors.category?.message}
            </p>
          </div>

          <div>
            <label className="text-sm">Amount</label>
            <input
              type="number"
              {...register("amount")}
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-xs">
              {errors.amount?.message}
            </p>
          </div>

          <div>
            <label className="text-sm">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-xs">
              {errors.date?.message}
            </p>
          </div>

          <div>
            <label className="text-sm">Note</label>
            <input
              {...register("note")}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border py-2 rounded"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="w-1/2 bg-black text-white py-2 rounded disabled:opacity-60"
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
