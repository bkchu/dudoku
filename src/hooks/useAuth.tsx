import { AuthContext } from "components/AuthProvider/AuthProvider"
import { Auth } from "models/client/auth/auth"
import { useContext } from "react"

export const useAuth = (): Auth => {
  return useContext(AuthContext)
}
