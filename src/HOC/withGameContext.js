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

const scoreValues = {
  fivePointCards: 5,
  tenPointCards: 10,
  twentyPointCards: 20,
  fiftyPointCards: 50,
  redThrees: 300,
  dirty: 300,
  clean: 500,
  wild: 1500,
}

export const withGameContext =
  Component =>
  ({ ...rest }) => {
    const { playersState } = usePlayerContext()
    const [gameState, setGameState] = useState(initialGameRoundValues)
    const activeRoundIdx = gameState?.findIndex(round => round?.isActive)
    console.log('gameState', gameState)
    console.log('scorecards', gameState?.[activeRoundIdx]?.['scorecards'])

    const getNameById = id => {
      return playersState?.filter(player => player?.id === id)?.[0]?.name
    }

    const handleGameStateChange = ({ name, id }) => {
      const playerName = getNameById(id)

      let newRoundValues = [...gameState]

      newRoundValues[activeRoundIdx][name] = playerName

      setGameState(newRoundValues)
    }

    const getBookScores = books => {
      const dirty = books?.dirty * scoreValues.dirty
      const clean = books?.clean * scoreValues.clean
      const wild = books?.wild * scoreValues.wild
      return [dirty, clean, wild]
    }

    const getPlayedCardsScores = playedCards => {
      const fivePointCards = playedCards?.fivePointCards * scoreValues.fivePointCards
      const tenPointCards = playedCards?.tenPointCards * scoreValues.tenPointCards
      const twentyPointCards = playedCards?.twentyPointCards * scoreValues.twentyPointCards
      const fiftyPointCards = playedCards?.fiftyPointCards * scoreValues.fiftyPointCards
      return [fivePointCards, tenPointCards, twentyPointCards, fiftyPointCards]
    }

    const getHeldCardsScores = playedCards => {
      const fivePointCards = playedCards?.fivePointCards * scoreValues.fivePointCards
      const tenPointCards = playedCards?.tenPointCards * scoreValues.tenPointCards
      const twentyPointCards = playedCards?.twentyPointCards * scoreValues.twentyPointCards
      const fiftyPointCards = playedCards?.fiftyPointCards * scoreValues.fiftyPointCards
      const redThrees = playedCards?.redThrees * scoreValues.redThrees
      return [fivePointCards, tenPointCards, twentyPointCards, fiftyPointCards, redThrees]
    }

    const handleScoreStateChange = ({ name, value, id: playerId }, scoreType) => {
      console.log('name', name)
      console.log('value', value)
      console.log('playerId', playerId)
      console.log('scoreType', scoreType)

      const playerIndex = gameState?.[activeRoundIdx]?.['scorecards']?.findIndex(
        player => player?.id === playerId
      )

      const updatedScoreTypes = updateScorecards(name, value, scoreType, playerIndex)

      const updatedPlayerScorecards = updatePlayerScrorecards(
        updatedScoreTypes,
        scoreType,
        playerIndex
      )

      const updatedRound = updateRound(updatedPlayerScorecards)

      const updatedGameState = updateGameState(updatedRound)

      setGameState(updatedGameState)
    }

    const updateScorecards = (name, value, scoreType, playerIndex) => {
      const currentScoreType =
        gameState?.[activeRoundIdx]?.['scorecards']?.[playerIndex]?.[scoreType]

      let newScoreType = { ...currentScoreType }
      newScoreType[name] = +value

      switch (scoreType) {
        case 'books':
          newScoreType['sumBookPoints'] = getBookScores(newScoreType)?.reduce(
            (accum, book) => accum + book
          )
          break
        case 'playedCards':
          newScoreType['sumPlayedCards'] = getPlayedCardsScores(newScoreType)?.reduce(
            (accum, played) => accum + played
          )
          break
        case 'heldCards':
          newScoreType['sumHeldCards'] = getHeldCardsScores(newScoreType)?.reduce(
            (accum, played) => accum + played
          )
          break
        default:
          return scoreType
      }

      return newScoreType
    }

    const updatePlayerScrorecards = (updatedScoreTypes, scoreType, playerIndex) => {
      const currentPlayerScorecard = gameState?.[activeRoundIdx]?.['scorecards']?.[playerIndex]
      let newScorecard = { ...currentPlayerScorecard }
      newScorecard[scoreType] = updatedScoreTypes

      const currentScorecards = gameState?.[activeRoundIdx]?.['scorecards']
      let newScorecards = [...currentScorecards]
      newScorecards[playerIndex] = newScorecard

      return newScorecards
    }

    const updateRound = updatedPlayerScorecards => {
      const currentRound = gameState?.[activeRoundIdx]
      let newRound = { ...currentRound }
      newRound['scorecards'] = updatedPlayerScorecards

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
