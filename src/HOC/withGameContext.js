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
    dealerBonus: 0,
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
    meld_points: 60,
    isActive: true,
    winnerId: '',
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
  (Component, gameValues = null) =>
  ({ ...rest }) => {
    const { getRoundLosersIndexes } = usePlayerContext()
    const [gameState, setGameState] = useState(gameValues ? gameValues : initialGameRoundValues)
    const activeRoundIdx = gameState?.findIndex(round => round?.isActive)
    const getActivePlayerIdx = playerId => {
      return gameState?.[activeRoundIdx]?.['scorecards']?.findIndex(scorecard => {
        return scorecard?.id === playerId
      })
    }
    console.log('gameValues', gameValues)
    const handleRoundStateChange = ({ name, id = null, value }) => {
      let newRoundValues = [...gameState]
      newRoundValues[activeRoundIdx][name] = id ?? value

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
      const fivePointCards = playedCards?.fivePointCards * -scoreValues.fivePointCards
      const tenPointCards = playedCards?.tenPointCards * -scoreValues.tenPointCards
      const twentyPointCards = playedCards?.twentyPointCards * -scoreValues.twentyPointCards
      const fiftyPointCards = playedCards?.fiftyPointCards * -scoreValues.fiftyPointCards
      const redThrees = playedCards?.redThrees * -scoreValues.redThrees
      return [fivePointCards, tenPointCards, twentyPointCards, fiftyPointCards, redThrees]
    }

    const handleScoreStateChange = ({ name, value, id }, scoreType) => {
      const activePlayerIdx = getActivePlayerIdx(id)

      switch (scoreType) {
        case 'winnerBonus':
        case 'dealerBonus':
          const currentPlayerScorecards = gameState?.[activeRoundIdx]?.['scorecards']
          const updatedPlayerScorecardsPartialMutate = updatePlayerScorecards(
            currentPlayerScorecards,
            scoreType,
            activePlayerIdx,
            value
          )
          const updatedRoundPartialMutate = updateRound(updatedPlayerScorecardsPartialMutate)
          const updatedGameStatePartialMutate = updateGameState(updatedRoundPartialMutate)

          setGameState(updatedGameStatePartialMutate)
          break
        default:
          const updatedScoreTypes = updateScorecardsTypes(name, value, scoreType, activePlayerIdx)
          const updatedPlayerScorecards = updatePlayerScorecards(
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

    const updateScorecardsTypes = (name, value, scoreType, activePlayerIdx) => {
      const currentScoreType =
        gameState?.[activeRoundIdx]?.['scorecards']?.[activePlayerIdx]?.[scoreType]
      let newScoreType = { ...currentScoreType }

      switch (scoreType) {
        case 'books':
          newScoreType[name] = +value
          newScoreType['sumBookPoints'] = getBookScores(newScoreType)?.reduce(
            (accum, book) => accum + book
          )
          break
        case 'playedCards':
          newScoreType[name] = +value
          newScoreType['sumPlayedCards'] = getPlayedCardsScores(newScoreType)?.reduce(
            (accum, played) => accum + played
          )
          break
        case 'heldCards':
          newScoreType[name] = +value
          newScoreType['sumHeldCards'] = getHeldCardsScores(newScoreType)?.reduce(
            (accum, played) => accum + played
          )
          break
        default:
          return newScoreType
      }

      return newScoreType
    }

    const updatePlayerScorecards = (
      updatedScoreTypes,
      scoreType,
      activePlayerIdx,
      value = null
    ) => {
      const currentPlayerScorecard = gameState?.[activeRoundIdx]?.['scorecards']?.[activePlayerIdx]
      let newScorecard = { ...currentPlayerScorecard }

      const currentScorecards = gameState?.[activeRoundIdx]?.['scorecards']
      let newScorecards = [...currentScorecards]

      if (scoreType === 'winnerBonus' || scoreType === 'dealerBonus') {
        newScorecard[scoreType] = +value
        calculateRoundPointsTotalForPlayer(newScorecard)
        const winnerId = gameState?.[activeRoundIdx]?.winnerId
        const loserIndexes = getRoundLosersIndexes(winnerId)

        loserIndexes?.forEach(loserIdx => {
          const currentLoserScorecard = gameState?.[activeRoundIdx]?.['scorecards']?.[loserIdx]
          let newLoserScorecard = { ...currentLoserScorecard }
          newLoserScorecard[scoreType] = 0

          calculateRoundPointsTotalForPlayer(newLoserScorecard)

          newScorecards[loserIdx] = newLoserScorecard
        })
      } else {
        newScorecard[scoreType] = updatedScoreTypes
        calculateRoundPointsTotalForPlayer(newScorecard)
      }

      newScorecards[activePlayerIdx] = newScorecard

      return newScorecards
    }

    const calculateRoundPointsTotalForPlayer = scorecard => {
      const sumBookPoints = scorecard?.books?.sumBookPoints
      const sumPlayedPoints = scorecard?.playedCards?.sumPlayedCards
      const sumHeldpoints = scorecard?.heldCards?.sumHeldCards
      const winnerBonus = scorecard?.winnerBonus
      const dealerBonus = scorecard?.dealerBonus

      scorecard['totalRoundPoints'] =
        sumBookPoints + sumPlayedPoints + sumHeldpoints + winnerBonus + dealerBonus
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
          <RoundChangeContext.Provider value={handleRoundStateChange}>
            <ScoreChangeContext.Provider value={handleScoreStateChange}>
              <Component {...rest} />
            </ScoreChangeContext.Provider>
          </RoundChangeContext.Provider>
        </SetGameStateContext.Provider>
      </GameStateContext.Provider>
    )
  }
