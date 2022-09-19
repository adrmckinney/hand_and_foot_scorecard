// @flow

import { act } from 'react-dom/test-utils'
import { colorThemes } from '../../configs/global-styles'
import IconButton from '../../CustomComponents/IconButton'
import { useGameContext } from '../../HOC/withGameContext'
import useGetActiveIndexes from '../../_helpers/useGetActiveIndexes'

type Props = {
  title: String,
  fields: Object,
}

const ScorecardSection = ({ title, fields }: Props) => {
  const { handleScoreStateChange, gameState } = useGameContext()
  const { activeRoundIdx, activePlayerIdx, activePlayerId } = useGetActiveIndexes()
  console.log('activePlayerId in card section', activePlayerId)
  const handleIncreaseCount = (name, id, scoreType) => {
    const currentValue =
      gameState?.[activeRoundIdx]?.scorecards?.[activePlayerIdx]?.[scoreType]?.[name]
    console.log('currentValue', currentValue)
    const value = currentValue + 1
    handleScoreStateChange({ name, value, id }, scoreType)
  }

  return (
    <>
      <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <div className='grid grid-cols-3 gap-2'>
              {fields?.map(field => (
                <div key={field?.field} className='flex space-x-2'>
                  <div className='flex items-center'>
                    <div>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {field?.label}
                      </label>
                      <input
                        type='number'
                        name={field?.field}
                        value={
                          gameState?.[activeRoundIdx]?.scorecards?.[activePlayerIdx]?.[
                            field?.scoreType
                          ]?.[field?.field] || 0
                        }
                        id={activePlayerId}
                        autoComplete='given-name'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm'
                        onChange={e => handleScoreStateChange(e.target, field?.scoreType)}
                      />
                    </div>

                    <div className='flex flex-col justify-between mt-1 self-end'>
                      <IconButton
                        size={'sm'}
                        onClick={() =>
                          handleIncreaseCount(field?.field, activePlayerId, field?.scoreType)
                        }
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScorecardSection
