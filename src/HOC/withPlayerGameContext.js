import { useContext, createContext, useState } from 'react'
import { v4 } from 'uuid'

export const PlayersContext = createContext()

export const usePlayersContext = () => {
  return useContext(PlayersContext)
}
export const withPlayersGameContext =
  (Component, playerState = null) =>
  ({ ...rest }) => {
    const [players, setPlayers] = useState(
      playerState
        ? playerState
        : [
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
    )

    const updatePlayer = ({ name, value }, index) => {
      let newInputValues = [...players]
      newInputValues[index][name] = value

      setPlayers(newInputValues)
    }

    return (
      <PlayersContext.Provider value={{ players, updatePlayer }}>
        <Component {...rest} />
      </PlayersContext.Provider>
    )
  }
