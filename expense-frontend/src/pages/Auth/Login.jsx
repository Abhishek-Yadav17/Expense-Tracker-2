import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../redux/slices/authSlice"
import { Link, useNavigate } from "react-router-dom"

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

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
      await dispatch(loginUser(data)).unwrap()
    } catch {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 p-6 border rounded space-y-4"
      >
        <h2 className="text-xl font-semibold">Login</h2>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">
            {errors.password?.message}
          </p>
        </div>

        <button className="w-full bg-black text-white py-2">
          Login
        </button>

        <p className="text-sm">
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
