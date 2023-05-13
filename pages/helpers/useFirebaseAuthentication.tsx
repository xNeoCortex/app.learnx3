import { useEffect } from "react"
import { useState } from "react"
import { onAuthStateChanged } from "firebase/auth"

const useFirebaseAuthentication = (firebase) => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unlisten = onAuthStateChanged(firebase, (authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null)
    })
    return () => {
      unlisten()
    }
  }, [])

  return authUser
}

export default useFirebaseAuthentication
