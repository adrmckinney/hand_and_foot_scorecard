// @flow

import { useGameContext } from '../HOC/withGameContext'
import { usePlayerContext } from '../HOC/withPlayerContext'

const RoundWinnerPage = () => {
  const { playersState } = usePlayerContext()
  const { handleRoundStateChange, handleScoreStateChange } = useGameContext()

  return (
    <>
      <fieldset>
        <legend className='text-lg font-medium text-gray-900'>Select Winner</legend>
        <div className='mt-4 divide-y divide-gray-200 border-t border-b border-gray-200'>
          {playersState.map((player, idx) => (
            <div key={player?.id} className='relative flex items-start py-4'>
              <div className='min-w-0 flex-1 text-sm'>
                <label
                  htmlFor={`player-${player?.id}`}
                  className='select-none font-medium text-gray-700'
                >
                  {player?.name}
                </label>
              </div>
              <div className='ml-3 flex h-5 items-center'>
                <input
                  id={player?.id}
                  name={`winnerId`}
                  type='radio'
                  className='h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500'
                  onClick={e => {
                    handleRoundStateChange(e.target)
                    handleScoreStateChange({ value: 100, id: player?.id }, 'winnerBonus')
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  )
}

export default RoundWinnerPage
