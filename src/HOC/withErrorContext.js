import { createContext, useContext, useState } from 'react'

const ErrorStateContext = createContext()
const SetErrorStateContext = createContext()

export const useErrorContext = validate => {
  const httpError = useContext(ErrorStateContext)
  const setHttpError = useContext(SetErrorStateContext)

  return {
    httpError,
    setHttpError,
  }
}

export const withErrorContext =
  Component =>
  ({ ...rest }) => {
    const [httpError, setHttpError] = useState(null)

    return (
      <ErrorStateContext.Provider value={httpError}>
        <SetErrorStateContext.Provider value={setHttpError}>
          <Component {...rest} />
        </SetErrorStateContext.Provider>
      </ErrorStateContext.Provider>
    )
  }
