import { UserData, SessionData } from "../userbase/userbase"

export interface Auth {
  userData: UserData
  isLoading: boolean
  login: (
    username: string,
    password: string,
    onSuccess: (user?: SessionData) => void,
    onError: (error?: Error) => void
  ) => {}
  signUp: (
    username: string,
    password: string,
    onSuccess: (user?: SessionData) => void,
    onError: (error?: Error) => void
  ) => {}
}