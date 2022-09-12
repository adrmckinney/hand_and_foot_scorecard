import { useEffect, useState } from 'react'

const useLoginValidation = ({ username, password }) => {
  const [apiErrors, setApiErrors] = useState('')
  const [usernameError, setUsernameError] = useState({
    value: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    value: false,
    message: '',
  })

  useEffect(() => {
    setUsernameError(state => ({
      ...state,
      value: username?.length === 0,
      message: 'Username is required',
    }))

    setPasswordError(state => ({
      ...state,
      value: password?.length === 0,
      message: 'Password is required',
    }))
  }, [username, password])

  const handleApiErrors = errorMessage => {
    switch (errorMessage) {
      case 'The username field is required. (and 1 more error)':
        setApiErrors('The username and password fields are required.')
        break
      case 'The username field is required.':
        setApiErrors(errorMessage)
        break
      case 'The password field is required.':
        setApiErrors(errorMessage)
        break
      default:
        setApiErrors(errorMessage)
        break
    }
  }

  return { usernameError, passwordError, handleApiErrors, apiErrors }
}

export default useLoginValidation
