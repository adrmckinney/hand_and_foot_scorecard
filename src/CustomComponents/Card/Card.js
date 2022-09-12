// @flow
import React, { Node } from 'react'

type Props = {
  header: Node,
  body: Node,
  children: Node,
}

const Card = ({ header, body, children }: Props) => {
  return (
    <>
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        {header}
        {body}
      </div>
    </>
  )
}

export default Card
