import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from "../../redux/slices/transactionSlice"
import { logoutUser } from "../../redux/slices/authSlice"

import TransactionModal from "./elements/TransactionModal"
import LogsList from "./elements/LogList"
import ChartBox from "./elements/ChartBox"
import CategoryBox from "./elements/CategoryBox"

const Home = () => {
  const dispatch = useDispatch()
  const { logs } = useSelector((state) => state.transactions)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const monthly = {}
  const categories = {}

  logs.forEach((log) => {
    const month = log.date.slice(0, 7)

    if (!monthly[month]) {
      monthly[month] = {
        month,
        income: 0,
        expense: 0,
      }
    }

    monthly[month][log.type] += log.amount

    categories[log.category] =
      (categories[log.category] || 0) + log.amount
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <button
          onClick={() => dispatch(logoutUser())}
          className="text-red-500"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        + Add Transaction
      </button>

      <TransactionModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => dispatch(addTransaction(data))}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartBox data={Object.values(monthly)} />
        </div>

        <CategoryBox categories={categories} />
      </div>

      <LogsList
        logs={logs}
        onDelete={(id) => dispatch(deleteTransaction(id))}
      />
    </div>
  )
}

export default Home
