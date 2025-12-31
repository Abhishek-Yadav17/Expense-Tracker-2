import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/slices/authSlice"
import { Link, useNavigate } from "react-router-dom"

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password1: z.string().min(8, "Minimum 8 characters"),
    password2: z.string().min(8, "Minimum 8 characters"),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  })

const Register = () => {
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
      await dispatch(registerUser(data)).unwrap()
    } catch {
      alert("Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 p-6 border rounded space-y-4"
      >
        <h2 className="text-xl font-semibold">Register</h2>

        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>
        </div>

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
            {...register("password1")}
            placeholder="Password"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">
            {errors.password1?.message}
          </p>
        </div>

        <div>
          <input
            type="password"
            {...register("password2")}
            placeholder="Confirm Password"
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm">
            {errors.password2?.message}
          </p>
        </div>

        <button className="w-full bg-black text-white py-2">
          Register
        </button>

        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
