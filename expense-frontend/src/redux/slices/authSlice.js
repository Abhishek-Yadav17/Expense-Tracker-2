import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API = import.meta.env.VITE_API_URL

const savedUser = JSON.parse(localStorage.getItem("user"))

export const checkUserStatus = createAsyncThunk(
  "auth/checkUserStatus",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.user?.token

    if (!token) {
      return rejectWithValue(null)
    }

    const res = await fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      throw new Error("User not authorized")
    }

    return res.json()
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Login failed")
    }

    return res.json()
  }
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Register failed")
    }

    return res.json()
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    localStorage.removeItem("user")
    return null
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }
        state.loading = false
      })
      .addCase(checkUserStatus.rejected, (state) => {
        state.user = null
        state.loading = false
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  },
})

export default authSlice.reducer
