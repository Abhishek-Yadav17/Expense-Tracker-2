import toast from "react-hot-toast"

const baseStyle = {
  borderRadius: "999px",
  background: "linear-gradient(90deg, #7A4A2E, #C47A52)",
  color: "#fff",
  padding: "12px 18px",
  fontWeight: 500,
}

export const showSuccess = (msg) =>
  toast.success(msg, { style: baseStyle })

export const showError = (msg) =>
  toast.error(msg, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #2E1E16, #7A4A2E)",
    },
  })
