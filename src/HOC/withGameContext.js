import { createContext, useContext, useState } from 'react'
import { usePlayerContext } from './withPlayerContext'

const GameStateContext = createContext()
const SetGameStateContext = createContext()
const RoundChangeContext = createContext()
const ScoreChangeContext = createContext()

export const useGameContext = () => {
  const gameState = useContext(GameStateContext)
  const setGameState = useContext(SetGameStateContext)
  const handleRoundStateChange = useContext(RoundChangeContext)
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
    handleRoundStateChange,
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
    const { playersState, getInactivePlayers, getRoundLosersIndexes } = usePlayerContext()
    const [gameState, setGameState] = useState(initialGameRoundValues)
    const activeRoundIdx = gameState?.findIndex(round => round?.isActive)
    console.log('gameState', gameState)

    const getNameById = id => {
      return playersState?.filter(player => player?.id === id)?.[0]?.name
    }

    const handleRoundStateChange = ({ name, id }) => {
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

    const handleScoreStateChange = ({ name, value, id: activePlayerIdx }, scoreType) => {
      console.log('name', name)
      console.log('value', value)
      console.log('scoreType', scoreType)

      switch (name) {
        case 'winnerBonus':
          const currentPlayerScorecards = gameState?.[activeRoundIdx]?.['scorecards']
          const updatedRoundPartialMutate = updateRound(currentPlayerScorecards, name, value)
          const updatedGameStatePartialMutate = updateGameState(updatedRoundPartialMutate)

          setGameState(updatedGameStatePartialMutate)
          break
        default:
          const updatedScoreTypes = updateScorecards(name, value, scoreType, activePlayerIdx)
          const updatedPlayerScorecards = updatePlayerScrorecards(
            updatedScoreTypes,
            scoreType,
            activePlayerIdx
          )
          const updatedRound = updateRound(updatedPlayerScorecards)
          const updatedGameState = updateGameState(updatedRound)

          setGameState(updatedGameState)
          break
      }
    }

    const updateScorecards = (name, value, scoreType, activePlayerIdx) => {
      const currentScoreType =
        gameState?.[activeRoundIdx]?.['scorecards']?.[activePlayerIdx]?.[scoreType]

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

    const updatePlayerScrorecards = (updatedScoreTypes, scoreType, activePlayerIdx) => {
      const currentPlayerScorecard = gameState?.[activeRoundIdx]?.['scorecards']?.[activePlayerIdx]
      let newScorecard = { ...currentPlayerScorecard }
      newScorecard[scoreType] = updatedScoreTypes

      const currentScorecards = gameState?.[activeRoundIdx]?.['scorecards']
      let newScorecards = [...currentScorecards]
      newScorecards[activePlayerIdx] = newScorecard

      return newScorecards
    }

    const updateRound = (updatedPlayerScorecards, name = null, value = null) => {
      const currentRound = gameState?.[activeRoundIdx]
      let newRound = { ...currentRound }

      if (name !== null) {
        // when selecting a different winner, the loser indxs don't change
        console.log('getRoundLosersIndexes()', getRoundLosersIndexes(activeRoundIdx))
        newRound[name] = value
      }

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
          <RoundChangeContext.Provider value={handleRoundStateChange}>
            <ScoreChangeContext.Provider value={handleScoreStateChange}>
              <Component {...rest} />
            </ScoreChangeContext.Provider>
          </RoundChangeContext.Provider>
        </SetGameStateContext.Provider>
      </GameStateContext.Provider>
    )
  }
