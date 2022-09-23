import { lazy, useState } from 'react'
import OneButtonFooter from './components/one-button-footer'
import TwoButtonFooter from './components/two-button-footer'
import ConditionalRender from './CustomComponents/conditional-render'
import Page from './CustomComponents/Page'
import { usePlayerContext, withPlayerContext } from './HOC/withPlayerContext'
import { useGameContext, withGameContext } from './HOC/withGameContext'
import GameSummaryPage from './pages/GameSummaryPage'
import useGetActiveIndexes from './_helpers/useGetActiveIndexes'

const GameSetupPage = lazy(() => import('./pages/GameSetupPage'))
const GameStartPage = lazy(() => import('./pages/GameStartPage'))
const RoundStartPage = lazy(() => import('./pages/RoundStartPage'))
const RoundWinnerPage = lazy(() => import('./pages/RoundWinnerPage'))
const RoundScorePage = lazy(() => import('./pages/RoundScorePage'))

function App() {
  const [step, setStep] = useState('start')
  const { playersState, handleChange, setPlayerToPlayFirst } = usePlayerContext()
  const { gameState, setGameState, scorecard, handleRoundStateChange } = useGameContext()
  const { activeRoundIdx } = useGetActiveIndexes()
  const activeRound = gameState?.filter(round => round?.isActive)[0]

  const setNewActivePlayerToGoFirst = (activeRoundIndex = 0) => {
    const currentPlayFirstPlayerIdx = playersState?.findIndex(player => player?.playsFirst)
    const playerCount = playersState?.length
    console.log('activeRoundIndex', activeRoundIndex)
    let newActivePlayerId =
      currentPlayFirstPlayerIdx + 1 === playerCount || activeRoundIndex === 0
        ? playersState?.[0]?.id
        : playersState?.[currentPlayFirstPlayerIdx + 1]?.id
    console.log('newActivePlayerId', newActivePlayerId)
    setPlayerToPlayFirst(newActivePlayerId)
  }

  const setupPlayersScoreData = () => {
    let newGameState = [...gameState]
    let playerScorecard = []

    setNewActivePlayerToGoFirst()

    playersState?.forEach(player => {
      playerScorecard?.push({ ...scorecard, name: player?.name, id: player?.id })
    })

    newGameState[activeRoundIdx]['scorecards'] = playerScorecard
    setGameState(newGameState)

    setStep('start-round')
  }

  const createNewRound = currentActiveRoundNumber => {
    handleRoundStateChange({ name: 'isActive', value: false })
    const currentMeldPoints = gameState?.[activeRoundIdx]?.meld_points

    let newGameState = [
      ...gameState,
      {
        round: currentActiveRoundNumber + 1,
        meld_points: currentMeldPoints < 150 ? currentMeldPoints + 30 : currentMeldPoints,
        isActive: true,
        winnerId: '',
      },
    ]

    let playerScorecard = []

    setNewActivePlayerToGoFirst(activeRoundIdx + 1)

    playersState?.forEach(player => {
      playerScorecard?.push({ ...scorecard, name: player?.name, id: player?.id })
    })

    newGameState[currentActiveRoundNumber]['scorecards'] = playerScorecard

    setGameState(newGameState)
  }

  const calculatePlayerScores = (resetRoundScore = '') => {
    gameState?.[activeRoundIdx]?.scorecards?.forEach((scorecard, idx) => {
      const playerCurrentScore = playersState?.[idx]?.score
      if (resetRoundScore === 'reset') {
        const resetScore = playerCurrentScore - scorecard?.totalRoundPoints

        handleChange({ name: 'score', value: resetScore }, idx)
      } else {
        const newScore = playerCurrentScore + scorecard?.totalRoundPoints

        handleChange({ name: 'score', value: newScore }, idx)
      }
    })
  }

  const renderPageContents = [
    {
      step: 'start',
      title: 'Hand and Foot Scorecard',
      component: <GameStartPage setStep={setStep} />,
    },
    {
      step: 'setup',
      title: 'Game Setup',
      component: <GameSetupPage />,
      footerComponent: <OneButtonFooter title={'Start Game'} onClick={setupPlayersScoreData} />,
    },
    {
      step: 'start-round',
      title: `Round ${activeRound?.round}`,
      component: <RoundStartPage />,
      footerComponent: (
        <TwoButtonFooter
          leftBtnTitle={'Back'}
          rightBtnTitle={'Round Over'}
          leftOnClick={() => setStep('setup')}
          rightOnClick={() => setStep('round-winner')}
        />
      ),
    },
    {
      step: 'round-winner',
      title: `Round ${activeRound?.round} Winner`,
      component: <RoundWinnerPage />,
      footerComponent: (
        <TwoButtonFooter
          leftBtnTitle={'Back'}
          rightBtnTitle={'Scores'}
          leftOnClick={() => setStep('start-round')}
          rightOnClick={() => setStep('round-score')}
        />
      ),
    },
    {
      step: 'round-score',
      title: `Round ${activeRound?.round} Score`,
      component: <RoundScorePage />,
      footerComponent: (
        <TwoButtonFooter
          leftBtnTitle={'Back'}
          rightBtnTitle={'Calculate Scores'}
          leftOnClick={() => setStep('round-winner')}
          rightOnClick={() => {
            calculatePlayerScores()
            setStep('game-summary')
          }}
        />
      ),
    },
    {
      step: 'game-summary',
      title: `Game Summary`,
      component: <GameSummaryPage />,
      footerComponent: (
        <TwoButtonFooter
          leftBtnTitle={'Back'}
          rightBtnTitle={`Start Round ${activeRound?.round + 1}`}
          leftOnClick={() => {
            calculatePlayerScores('reset')
            setStep('round-score')
          }}
          rightOnClick={() => {
            createNewRound(activeRound?.round)
            setStep('start-round')
          }}
        />
      ),
    },
  ]

  return (
    <>
      {renderPageContents?.map(content => (
        <ConditionalRender key={content.title} condition={step === content?.step}>
          <Page
            title={content?.title}
            component={content.component}
            footerComponent={content?.footerComponent}
          />
        </ConditionalRender>
      ))}
    </>
  )
}

export default withPlayerContext(withGameContext(App))
