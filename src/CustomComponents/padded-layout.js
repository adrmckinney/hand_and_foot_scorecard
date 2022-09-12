// @flow
import React, { Node } from 'react'

type Props = {
  classNames?: String,
  style?: Object,
  children?: Node,
}

const PaddedLayout = ({ classNames = '', style = {}, children }: Props) => {
  return (
    <div className={`p-4 ${classNames}`} style={style}>
      {children}
    </div>
  )
}

export default PaddedLayout
