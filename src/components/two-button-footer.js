// @flow

import Button from '../CustomComponents/Button'
import HorizontalLayout from '../CustomComponents/horizontal-layout'

type Props = {
  leftBtnTitle: String,
  rightBtnTitle: String,
  leftOnClick: () => {},
  rightOnClick: () => {},
}

const TwoButtonFooter = ({ leftBtnTitle, rightBtnTitle, leftOnClick, rightOnClick }: Props) => {
  return (
    <>
      <HorizontalLayout flex={{ mbl: 'flex' }} classNames={'justify-around'}>
        <Button title={leftBtnTitle} size='lg' onClick={leftOnClick} />
        <Button title={rightBtnTitle} size='lg' onClick={rightOnClick} />
      </HorizontalLayout>
    </>
  )
}

export default TwoButtonFooter
