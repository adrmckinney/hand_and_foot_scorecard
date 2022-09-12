// @flow

import { useEffect, useState } from 'react'
import { colorThemes } from '../configs/global-styles'
import Button from '../CustomComponents/Button'
import IconButton from '../CustomComponents/IconButton'
import Input from '../CustomComponents/input'
import { useGameContext } from '../HOC/withGameContext'
import { usePlayerContext } from '../HOC/withPlayerContext'

const RoundScorePage = () => {
  const { playersState } = usePlayerContext()
  const { handleGameStateChange } = useGameContext()

  const initialActiveScore = { id: playersState?.[0]?.id, name: playersState?.[0]?.name }

  const [isActiveScore, setIsActiveScore] = useState(initialActiveScore)

  const [isNonActiveScore, setIsNonActiveScore] = useState(null)

  useEffect(() => {
    let initialNonActiveScore = []
    playersState?.forEach(player => {
      if (player?.id !== isActiveScore?.id) {
        initialNonActiveScore.push({ id: player?.id, name: player?.name })
      }
    })

    setIsNonActiveScore(initialNonActiveScore)
  }, [isActiveScore])

  console.log('playersState', playersState)

  console.log('isNonActiveScore', isNonActiveScore)

  console.log('isActiveScore', isActiveScore)

  const handleIncreaseCount = (id, key) => {}

  return (
    <>
      <div className='space-y-6'>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-bold tracking-tight text-sky-700'>
            {playersState?.[0]?.name}
          </h2>
          {/* {playersState?.filter(player => {})}
          <Button title={'Score Other'} size={'xs'} /> */}
        </div>
        <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Books</h3>
            </div>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3 flex space-x-2 items-center'>
                  <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                    Dirty
                  </label>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    className='mt-1 block w-1/6 rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm'
                  />
                  <div className='flex flex-col justify-between mt-1'>
                    <IconButton
                      size={'sm'}
                      onClick={() => handleIncreaseCount()}
                      icon='plusSm'
                      customIconStyle={colorThemes.primary.iconText}
                    />
                    <IconButton
                      size={'sm'}
                      // onClick={() => removePlayer(index)}
                      icon='minus'
                      customIconStyle={colorThemes.primary.iconText}
                    />
                  </div>
                </div>

                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='email-address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Wild
                  </label>
                  <input
                    type='text'
                    name='email-address'
                    id='email-address'
                    autoComplete='email'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoundScorePage
