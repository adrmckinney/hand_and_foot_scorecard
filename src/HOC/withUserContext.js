import { createContext, useContext, useEffect, useState } from 'react'

const UserStateContext = createContext()
const SetUserStateContext = createContext()

export const useUserContext = validate => {
  const authUser = useContext(UserStateContext)
  const setAuthUser = useContext(SetUserStateContext)

  return {
    authUser,
    setAuthUser,
  }
}

export const withUserContext =
  Component =>
  ({ ...rest }) => {
    const storedAuthUser = localStorage.getItem('authUser')
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
      if (storedAuthUser !== null) {
        setAuthUser(JSON.parse(storedAuthUser))
      } else if (!!authUser) {
        setAuthUser(null)
      }
    }, [storedAuthUser])

    return (
      <UserStateContext.Provider value={authUser}>
        <SetUserStateContext.Provider value={setAuthUser}>
          <Component {...rest} />
        </SetUserStateContext.Provider>
      </UserStateContext.Provider>
    )
  }
