import React from 'react'
import { colorThemes } from '../configs/global-styles'
import Icon from './Icon'

const Search = () => {
  return (
    <>
      <div className='flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end'>
        <div className='max-w-lg w-full lg:max-w-xs'>
          <label htmlFor='search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Icon icon={'magnifyingGlass'} size='lg' customIconStyle={'text-gray-400'} />
            </div>
            <input
              id='search'
              name='search'
              className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 ${colorThemes.primary.focusRing} ${colorThemes.primary.focusBorder} sm:text-sm`}
              placeholder='Search'
              type='search'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
