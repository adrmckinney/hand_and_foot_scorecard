// @flow

import { usePlayerContext } from '../HOC/withPlayerContext'
import { useGameContext } from '../HOC/withGameContext'

const RoundStartPage = () => {
  const { playersState } = usePlayerContext()
  const { gameState } = useGameContext()
  const activeRound = gameState?.filter(round => round?.isActive)[0]

  return (
    <>
      <h2 className='text-3xl font-bold tracking-tight text-sky-700'>Meld Points</h2>
      <div className='space-y-4 mt-6'>
        {playersState?.map(player => (
          <div key={player?.id} className={'w-full flex justify-around'}>
            <div className='text-md font-medium text-gray-900 tracking-wider'>{player?.name}</div>
            <div className='text-md text-gray-900'>{activeRound?.meld_points}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default RoundStartPage
