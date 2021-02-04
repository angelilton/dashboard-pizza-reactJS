import React, { useState, createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import firebase from 'services/firebase'

export const AuthContext = createContext()

const initialState = {
  isUserLoggedIn: false,
  user: null
}

function Auth({ children }) {
  const [userInfo, setUserInfo] = useState(initialState)

  const login = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }, [])

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logout!')
        setUserInfo(initialState)
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
Auth.propTypes = {
  children: PropTypes.node.isRequired
}

export default Auth
