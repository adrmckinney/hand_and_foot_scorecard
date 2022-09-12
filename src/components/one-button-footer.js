// @flow

import Button from '../CustomComponents/Button'
import HorizontalLayout from '../CustomComponents/horizontal-layout'

type Props = {
  title: String,
  onClick: () => {},
}

const OneButtonFooter = ({ title, onClick }: Props) => {
  return (
    <>
      <HorizontalLayout flex={{ mbl: 'flex' }} classNames={'justify-center'}>
        <Button title={title} size='xl' onClick={onClick} />
      </HorizontalLayout>
    </>
  )
}

export default OneButtonFooter
