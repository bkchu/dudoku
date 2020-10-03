import { useProvideAuth } from "hooks/useAuthProvider"
import { Auth } from "models/client/auth/auth"
import React, { createContext } from "react"

export const AuthContext = createContext({
  userData: null,
  isLoading: false,
} as Auth)

export default function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
