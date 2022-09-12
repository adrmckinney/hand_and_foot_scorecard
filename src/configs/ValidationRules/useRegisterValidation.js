import { useEffect, useReducer, useState } from 'react'

const useRegisterValidation = ({ password, confirm_password }, touched) => {
  const [apiErrors, setApiErrors] = useState([])
  const reducer = (validations, action) => {
    const setValue = field => ({
      ...validations,
      [field]: {
        ...validations?.[field],
        [action?.type]: {
          ...validations?.[field]?.[action?.type],
          value: action?.payload,
        },
      },
    })

    switch (action?.type) {
      case 'passwordExists':
        return setValue('password')
      case 'doesNotHaveValidLength':
        return setValue('password')
      case 'doesNotHaveNumber':
        return setValue('password')
      case 'doesNotHaveUpperCase':
        return setValue('password')
      case 'doesNotHaveLowerCase':
        return setValue('password')
      case 'specialCharacter':
        return setValue('password')
      case 'doesNotMatch':
        return setValue('confirm_password')
      default:
        return validations
    }
  }

  const initialState = {
    password: {
      passwordExists: {
        value: false,
        message: 'Password is required',
      },
      doesNotHaveValidLength: {
        value: false,
        message: 'Your password must be at least 8 characters',
      },
      doesNotHaveNumber: {
        value: false,
        message: 'Your password must include at least one number',
      },
      doesNotHaveUpperCase: {
        value: false,
        message: 'Your password must include at least one capital letter',
      },
      doesNotHaveLowerCase: {
        value: false,
        message: 'Your password must include at least one lower case letter',
      },
      specialCharacter: {
        value: false,
        message:
          'Your password must include at least one special character (! @ # $ % ^ & * ( ) _ +)',
      },
    },
    confirm_password: {
      doesNotMatch: {
        value: false,
        message: 'Your passwords must match',
      },
    },
  }

  const [validations, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (touched?.password) {
      Object.keys(validations?.password)?.map(validationKey => {
        dispatch({ type: validationKey, payload: validationConfigs(validationKey) })
      })
    }

    if (touched?.confirm_password) {
      Object.keys(validations?.confirm_password)?.map(validationKey => {
        dispatch({ type: validationKey, payload: validationConfigs(validationKey) })
      })
    }

    if (touched?.username) {
      setApiErrors({})
    }
  }, [password, confirm_password, touched])

  const validationConfigs = name => {
    switch (name) {
      case 'passwordExists':
        return password?.length === 0
      case 'doesNotHaveValidLength':
        return !(password?.length >= 8)
      case 'doesNotHaveNumber':
        return !/\d/.test(password)
      case 'doesNotHaveUpperCase':
        return !(password?.toLowerCase() !== password)
      case 'doesNotHaveLowerCase':
        return !(password?.toUpperCase() !== password)
      case 'specialCharacter':
        return !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)
      case 'doesNotMatch':
        return password && !(password === confirm_password)
      default:
        return false
    }
  }

  const passwordErrorsCount = Object.values(validations?.password)?.filter(
    val => val?.value === true
  )?.length
  const confirmPasswordErrorsCount = Object.values(validations?.confirm_password)?.filter(
    val => val?.value === true
  )?.length
  const apiErrorsCount = apiErrors?.username?.filter(val => val?.value === true)?.length

  const isDisabled = passwordErrorsCount + confirmPasswordErrorsCount + apiErrorsCount > 0

  const passwordValidations = Object.values(validations?.password)
  const confirmPasswordValidations = Object.values(validations?.confirm_password)

  const handleApiErrors = errorMessage => {
    switch (errorMessage) {
      case 'Username already exists':
        setApiErrors({ username: [{ message: 'Username already exists', value: true }] })
        break
      default:
        setApiErrors([{ message: errorMessage, value: true }])
        break
    }
  }

  return {
    passwordValidations,
    confirmPasswordValidations,
    isDisabled,
    apiErrors,
    handleApiErrors,
  }
}

export default useRegisterValidation
