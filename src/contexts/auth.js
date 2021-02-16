import React, { useState, createContext, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import firebase, { db } from 'services/firebase'

export const AuthContext = createContext()

const initialState = {
  isUserLoggedIn: false,
  user: null
}

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(initialState)

  useEffect(() => {
    const uid = userInfo.user?.uid || 'EMPTY'
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists || uid === 'EMPTY') {
          return
        }

        db.collection('users').doc(uid).set({
          email: userInfo.user.email,
          name: userInfo.user.displayName,
          role: 'user'
        })
      })
  }, [userInfo])

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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider
