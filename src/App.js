import { lazy, useState } from 'react'
import OneButtonFooter from './components/one-button-footer'
import TwoButtonFooter from './components/two-button-footer'
import ConditionalRender from './CustomComponents/conditional-render'
import Page from './CustomComponents/Page'
import { usePlayerContext, withPlayerContext } from './HOC/withPlayerContext'
import { useGameContext, withGameContext } from './HOC/withGameContext'

const GameSetupPage = lazy(() => import('./pages/GameSetupPage'))
const GameStartPage = lazy(() => import('./pages/GameStartPage'))
const RoundStartPage = lazy(() => import('./pages/RoundStartPage'))
const RoundWinnerPage = lazy(() => import('./pages/RoundWinnerPage'))
const RoundScorePage = lazy(() => import('./pages/RoundScorePage'))

function App() {
  const [step, setStep] = useState('start')
  const { playersState, setActivePlayer } = usePlayerContext()
  const { gameState, setGameState, scorecard } = useGameContext()
  const activeRound = gameState?.filter(round => round?.isActive)[0]

  const setupPlayersScoreData = () => {
    let newGameState = [...gameState]
    let playerScorecard = []

    setActivePlayer(playersState?.[0]?.id)

    playersState?.forEach(player => {
      playerScorecard?.push({ ...scorecard, name: player?.name, id: player?.id })
    })

    newGameState[0]['scorecards'] = playerScorecard
    setGameState(newGameState)

    setStep('start-round')
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
          rightBtnTitle={'Scores'}
          leftOnClick={() => setStep('round-winner')}
          rightOnClick={() => setStep('round-score')}
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
