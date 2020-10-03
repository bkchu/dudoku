export interface SessionData {
    user: UserData
}

export interface UserData {
  authToken: string
  creationDate: string
  paymentsMode: string
  userId: string
  username: string
}
