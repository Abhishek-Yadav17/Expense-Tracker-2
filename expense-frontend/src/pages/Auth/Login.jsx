import { useState } from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../redux/slices/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { showError, showSuccess } from "../../utils/toast"

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await dispatch(loginUser(data)).unwrap()
      showSuccess("Welcome back")
    } catch {
      showError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[360px] bg-white rounded-2xl p-6 shadow-md space-y-5"
      >
        <div>
          <h2 className="text-2xl font-semibold text-[#2E1E16]">Login</h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome to Expense Tracker
          </p>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-full bg-[#F5F1EE] outline-none"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.email?.message}
          </p>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-[#F5F1EE] outline-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#7A4A2E] to-[#C47A52] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600">
          No account?{" "}
          <Link to="/register" className="text-[#C47A52] font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
