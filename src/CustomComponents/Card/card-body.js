// @flow
import React, { Node } from 'react'

type Props = {
  children?: Node,
}

const CardBody = ({ children }: Props) => {
  return (
    <>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>{children}</div>
    </>
  )
}

export default CardBody
