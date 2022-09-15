import { createContext, useContext, useState } from 'react'
import { usePlayerContext } from './withPlayerContext'

const GameStateContext = createContext()
const SetGameStateContext = createContext()
const InputChangeContext = createContext()
const ScoreChangeContext = createContext()

export const useGameContext = () => {
  const gameState = useContext(GameStateContext)
  const setGameState = useContext(SetGameStateContext)
  const handleGameStateChange = useContext(InputChangeContext)
  const handleScoreStateChange = useContext(ScoreChangeContext)

  const bookScores = {
    dirty: 0,
    clean: 0,
    wild: 0,
    sumBookPoints: 0,
  }

  const scorecard = {
    id: '',
    name: '',
    isActiveScoring: false,
    winnerBonus: 0,
    totalRoundPoints: 0,
    books: bookScores,
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
    handleScoreStateChange,
    scorecard,
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
    const activeRoundIdx = gameState?.findIndex(round => round?.isActive)
    console.log('gameState', gameState)
    const getNameById = id => {
      return playersState?.filter(player => player?.id === id)?.[0]?.name
    }

    const handleGameStateChange = ({ name, id }) => {
      const playerName = getNameById(id)

      let newRoundValues = [...gameState]

      newRoundValues[activeRoundIdx][name] = playerName

      setGameState(newRoundValues)
    }

    const handleScoreStateChange = ({ name, value, id: playerId }, scoreType) => {
      console.log('name', name)
      console.log('value', value)
      console.log('playerId', playerId)
      console.log('scoreType', scoreType)

      const playerIndex = gameState?.[activeRoundIdx]?.['scorecards']?.findIndex(
        player => player?.id === playerId
      )

      const updatedScorecards = updateScorecards(name, value, scoreType, playerIndex)

      const updatedRound = updateRound(updatedScorecards)

      const updatedGameState = updateGameState(updatedRound)

      setGameState(updatedGameState)
      // const sumBooks = Object.values(
      //   gameState?.[activeRoundIdx]?.['scorecards']?.[playerIndex]?.books
      // )?.reduce(book => book)
      // console.log('sumBooks', sumBooks)
    }

    const updateScorecards = (name, value, scoreType, playerIndex) => {
      const currentBooks = gameState?.[activeRoundIdx]?.['scorecards']?.[playerIndex]?.[scoreType]
      console.log('scoreType', scoreType)
      let newBooks = { ...currentBooks }

      newBooks[name] = +value
      newBooks['sumBookPoints'] = Object.values(newBooks)?.reduce((accum, curr) => accum + curr)

      const currentPlayerScorecard = gameState?.[activeRoundIdx]?.['scorecards']?.[playerIndex]
      let newScorecard = { ...currentPlayerScorecard }
      newScorecard[scoreType] = newBooks

      const currentScorecards = gameState?.[activeRoundIdx]?.['scorecards']
      let newScorecards = [...currentScorecards]
      newScorecards[playerIndex] = newScorecard

      return newScorecards
    }

    const updateRound = updatedScorecards => {
      const currentRound = gameState?.[activeRoundIdx]
      let newRound = { ...currentRound }
      newRound['scorecards'] = updatedScorecards

      return newRound
    }

    const updateGameState = updatedRound => {
      let newGameState = [...gameState]
      newGameState[activeRoundIdx] = updatedRound

      return newGameState
    }

    return (
      <GameStateContext.Provider value={gameState}>
        <SetGameStateContext.Provider value={setGameState}>
          <InputChangeContext.Provider value={handleGameStateChange}>
            <ScoreChangeContext.Provider value={handleScoreStateChange}>
              <Component {...rest} />
            </ScoreChangeContext.Provider>
          </InputChangeContext.Provider>
        </SetGameStateContext.Provider>
      </GameStateContext.Provider>
    )
  }
