import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkUserStatus } from "./redux/slices/authSlice"
import PrivateRoutes from "./utils/PrivateRoutes"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Home from "./pages/Dashboard/Home"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserStatus())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
