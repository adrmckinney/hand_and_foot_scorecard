import { createContext, useContext, useState } from 'react'
import { v4 } from 'uuid'

const InputStateContext = createContext()
const SetInputStateContext = createContext()
const InputChangeContext = createContext()
const InitialValuesContext = createContext()
const SetInitialValuesContext = createContext()
const FieldTouchedContext = createContext()
const SetFieldTouchedContext = createContext()
const HandleTouchedContext = createContext()

export const usePlayerContext = () => {
  const playersState = useContext(InputStateContext)
  const setPlayersState = useContext(SetInputStateContext)
  const handleChange = useContext(InputChangeContext)
  const initialValues = useContext(InitialValuesContext)
  const setInitialValues = useContext(SetInitialValuesContext)
  const touched = useContext(FieldTouchedContext)
  const setTouched = useContext(SetFieldTouchedContext)
  const handleTouched = useContext(HandleTouchedContext)
  return {
    playersState,
    setPlayersState,
    handleChange,
    initialValues,
    setInitialValues,
    touched,
    setTouched,
    handleTouched,
  }
}

export const withPlayerContext =
  Component =>
  ({ ...rest }) => {
    const initialValues = [
      {
        id: v4(),
        name: '',
        score: 0,
        playFirst: true,
      },
      {
        id: v4(),
        name: '',
        score: 0,
        playFirst: false,
      },
    ]
    const [touched, setTouched] = useState({})
    const [playersState, setPlayersState] = useState(initialValues)

    const handleChange = ({ name, value }, index) => {
      let newInputValues = [...playersState]
      newInputValues[index][name] = value

      setPlayersState(newInputValues)
    }

    const handleTouched = ({ name }) => {
      setTouched(touched => ({
        ...touched,
        [name]: true,
      }))
    }

    return (
      <InputStateContext.Provider value={playersState}>
        {/* <InitialValuesContext.Provider value={initialValues}> */}
        <FieldTouchedContext.Provider value={touched}>
          <SetInputStateContext.Provider value={setPlayersState}>
            {/* <SetInitialValuesContext.Provider value={setInitialValues}> */}
            <SetFieldTouchedContext.Provider value={setTouched}>
              <InputChangeContext.Provider value={handleChange}>
                <HandleTouchedContext.Provider value={handleTouched}>
                  <Component {...rest} />
                </HandleTouchedContext.Provider>
              </InputChangeContext.Provider>
            </SetFieldTouchedContext.Provider>
            {/* </SetInitialValuesContext.Provider> */}
          </SetInputStateContext.Provider>
        </FieldTouchedContext.Provider>
        {/* </InitialValuesContext.Provider> */}
      </InputStateContext.Provider>
    )
  }
