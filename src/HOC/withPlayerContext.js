import { createContext, useContext, useState } from 'react'
import { v4 } from 'uuid'

const InputStateContext = createContext()
const SetInputStateContext = createContext()
const InputChangeContext = createContext()
const FieldTouchedContext = createContext()
const SetFieldTouchedContext = createContext()
const HandleTouchedContext = createContext()

export const usePlayerContext = () => {
  const playersState = useContext(InputStateContext)
  const setPlayersState = useContext(SetInputStateContext)
  const handleChange = useContext(InputChangeContext)
  const touched = useContext(FieldTouchedContext)
  const setTouched = useContext(SetFieldTouchedContext)
  const handleTouched = useContext(HandleTouchedContext)

  const getInactivePlayers = () => {
    return playersState
      ?.filter(player => !player?.isActive)
      ?.map(player => {
        return {
          id: player?.id,
          name: player?.name,
        }
      })
  }

  const getRoundLosersIndexes = roundWinnerId => {
    const loserIndexes = []

    playersState.forEach((player, idx) => {
      if (player?.id !== roundWinnerId) {
        loserIndexes.push(idx)
      }
    })
    return loserIndexes
  }

  const getPlayerNameById = id => {
    return playersState?.filter(player => player?.id === id)?.[0]?.name
  }

  const setActivePlayer = id => {
    const currentActiveIdx = playersState?.findIndex(player => player?.isActive)
    const newActivePlayerIdx = playersState?.findIndex(player => player?.id === id)

    let newPlayersState = [...playersState]
    newPlayersState[currentActiveIdx]['isActive'] = false
    newPlayersState[newActivePlayerIdx]['isActive'] = true

    setPlayersState(newPlayersState)
  }

  const setPlayerToPlayFirst = id => {
    const currentActiveIdx = playersState?.findIndex(player => player?.playsFirst)
    const newActivePlayerIdx = playersState?.findIndex(player => player?.id === id)

    let newPlayersState = [...playersState]
    newPlayersState[currentActiveIdx]['playsFirst'] = false
    newPlayersState[newActivePlayerIdx]['playsFirst'] = true

    setPlayersState(newPlayersState)
  }

  return {
    playersState,
    setPlayersState,
    handleChange,
    touched,
    setTouched,
    handleTouched,
    setActivePlayer,
    setPlayerToPlayFirst,
    getInactivePlayers,
    getPlayerNameById,
    getRoundLosersIndexes,
  }
}

export const withPlayerContext =
  (Component, playerValues = null) =>
  ({ ...rest }) => {
    const initialValues = [
      {
        id: v4(),
        name: '',
        score: 0,
        isActive: true,
        playsFirst: true,
      },
      {
        id: v4(),
        name: '',
        score: 0,
        isActive: false,
        playsFirst: false,
      },
    ]
    const [touched, setTouched] = useState({})
    const [playersState, setPlayersState] = useState(playerValues ? playerValues : initialValues)
    console.log('playerValues', playerValues)
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
        <FieldTouchedContext.Provider value={touched}>
          <SetInputStateContext.Provider value={setPlayersState}>
            <SetFieldTouchedContext.Provider value={setTouched}>
              <InputChangeContext.Provider value={handleChange}>
                <HandleTouchedContext.Provider value={handleTouched}>
                  <Component {...rest} />
                </HandleTouchedContext.Provider>
              </InputChangeContext.Provider>
            </SetFieldTouchedContext.Provider>
          </SetInputStateContext.Provider>
        </FieldTouchedContext.Provider>
      </InputStateContext.Provider>
    )
  }
