// @flow
import React, { Node } from 'react'

type Props = {
  children?: Node,
}

const GridSection = ({ children }: Props) => {
  return (
    <>
      <div className='mt-12'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>{children}</div>
      </div>
    </>
  )
}

export default GridSection
