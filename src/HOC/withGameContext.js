import { createContext, useContext, useState } from 'react'
import { usePlayerContext } from './withPlayerContext'

const GameStateContext = createContext()
const SetGameStateContext = createContext()
const InputChangeContext = createContext()

export const useGameContext = () => {
  const gameState = useContext(GameStateContext)
  const setGameState = useContext(SetGameStateContext)
  const handleGameStateChange = useContext(InputChangeContext)

  const scoringData = {
    id: '',
    name: '',
    totalRoundPoints: 0,
    books: {
      dirty: 0,
      clean: 0,
      wild: 0,
      sumBookPoints: 0,
    },
    playedCards: {
      fivePointCards: 0,
      tenPointCards: 0,
      twentyPointCards: 0,
      fiftyPointCards: 0,
      sumPlayedCards: 0,
    },
    heldCards: {
      fivePointCards: 0,
      tenPointCards: 0,
      twentyPointCards: 0,
      fiftyPointCards: 0,
      redThrees: 0,
      sumHeldCards: 0,
    },
  }

  return {
    gameState,
    setGameState,
    handleGameStateChange,
    scoringData,
  }
}

const initialGameRoundValues = [
  {
    round: 1,
    meld_points: 50,
    isActive: true,
    winner: '',
  },
  {
    round: 2,
    meld_points: 90,
    isActive: false,
    winner: '',
  },
  {
    round: 3,
    meld_points: 120,
    isActive: false,
    winner: '',
  },
  {
    round: 4,
    meld_points: 150,
    isActive: false,
    winner: '',
  },
]

export const withGameContext =
  Component =>
  ({ ...rest }) => {
    const { playersState } = usePlayerContext()
    const [gameState, setGameState] = useState(initialGameRoundValues)
    console.log('gameState', gameState)
    const getNameById = id => {
      return playersState?.filter(player => player?.id === id)?.[0]?.name
    }

    const handleGameStateChange = ({ name, id }) => {
      const playerName = getNameById(id)

      let newRoundValues = [...gameState]
      const activeRoundIdx = newRoundValues?.findIndex(round => round?.isActive)

      newRoundValues[activeRoundIdx][name] = playerName

      setGameState(newRoundValues)
    }

    return (
      <GameStateContext.Provider value={gameState}>
        <SetGameStateContext.Provider value={setGameState}>
          <InputChangeContext.Provider value={handleGameStateChange}>
            <Component {...rest} />
          </InputChangeContext.Provider>
        </SetGameStateContext.Provider>
      </GameStateContext.Provider>
    )
  }
