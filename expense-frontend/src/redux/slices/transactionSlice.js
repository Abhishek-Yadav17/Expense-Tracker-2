import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API = import.meta.env.VITE_API_URL

const authHeader = (getState) => ({
  Authorization: `Bearer ${getState().auth.user?.token}`,
  "Content-Type": "application/json",
})

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { getState }) => {
    const res = await fetch(`${API}/transactions`, {
      headers: authHeader(getState),
    })

    return res.json()
  }
)

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data, { getState }) => {
    const res = await fetch(`${API}/transactions`, {
      method: "POST",
      headers: authHeader(getState),
      body: JSON.stringify(data),
    })

    return res.json()
  }
)

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, { getState }) => {
    await fetch(`${API}/transactions/${id}`, {
      method: "DELETE",
      headers: authHeader(getState),
    })

    return id
  }
)

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    logs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.logs = action.payload
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.logs.unshift(action.payload)
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.logs = state.logs.filter(
          (log) => log._id !== action.payload
        )
      })
  },
})

export default transactionSlice.reducer
