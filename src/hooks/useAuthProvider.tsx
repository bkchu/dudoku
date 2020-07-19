import { SessionData, UserData } from "models/client/userbase/userbase"
import { useEffect, useState } from "react"
import { Auth } from "models/client/auth/auth"
const userbase = typeof window !== "undefined" ? require("userbase-js").default : null

const useProvideAuth = (): Auth => {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<UserData>(null)

  /**
   * Logs the user in using the given username and password.
   * @param username the username
   * @param password the password
   * @param onSuccess the callback to execute after logging in successfully
   * @param onError the callback to execute if erroring
   */
  const login = async (username, password, onSuccess, onError) => {
    setIsLoading(true)
    try {
      const user: UserData = await userbase.signIn({
        username,
        password,
        rememberMe: "local",
      })
      setIsLoading(false)
      setUserData(user)
      onSuccess(user)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      setUserData(null)
      onError(error)
    }
  }

  /**
   * Signs the user up using the given username and password.
   * @param username the username
   * @param password the password
   * @param onSuccess the callback to execute after logging in successfully
   * @param onError the callback to execute if erroring
   */
  const signUp = async (username, password, onSuccess, onError) => {
    setIsLoading(true)
    try {
      const user: UserData = await userbase.signUp({
        username,
        password,
        rememberMe: "local",
      })
      setIsLoading(false)
      setUserData(user)
      onSuccess(user)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      setUserData(null)
      onError(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    userbase
      .init({ appId: process.env.GATSBY_USERBASE_APP_ID as string })
      .then((session: SessionData) => {
        setIsLoading(false)
        if (session?.user) {
          setUserData(session.user)
        }
      })
      .catch(error => {
        setIsLoading(false)
        setUserData(null)
        alert(error)
      })
  }, [])

  return { userData, isLoading, login, signUp }
}

export { useProvideAuth }

// import { useState, useEffect } from 'react';

// function useFriendStatus(friendID) {
//   const [isOnline, setIsOnline] = useState(null);

//   useEffect(() => {
//     function handleStatusChange(status) {
//       setIsOnline(status.isOnline);
//     }

//     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//     };
//   });

//   return isOnline;
// }
