import RoundSummariesSection from '../components/GameSummary/RoundSummariesSection'
import TotalScoreSection from '../components/GameSummary/TotalScoreSection'
import { useGameContext } from '../HOC/withGameContext'
import { usePlayerContext } from '../HOC/withPlayerContext'

const GameSummaryPage = () => {
  const { playersState } = usePlayerContext()
  const { gameState } = useGameContext()
  console.log('playersState', playersState)
  return (
    <>
      <div className='w-60 pb-12'>
        <h2 className='text-lg font-medium text-gray-900'>Total Scores</h2>
        <div className='mt-4 divide-y divide-gray-200 border-t border-b border-gray-200 w-full'>
          {playersState.map((player, idx) => (
            <TotalScoreSection key={player?.id} player={player} />
          ))}
        </div>
      </div>
      {gameState?.map((round, idx) => (
        <div key={round?.round} className='w-60 pt-12'>
          <h2 className='text-lg font-medium text-gray-900'>Round {idx + 1}</h2>
          <div className='mt-4 divide-y divide-gray-200 border-t border-b border-gray-200 w-full'>
            {round?.scorecards?.map(scorecard => (
              <RoundSummariesSection key={scorecard?.id} scorecard={scorecard} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default GameSummaryPage
