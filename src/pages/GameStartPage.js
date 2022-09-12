// @flow

import Button from '../CustomComponents/Button'

type Props = {
  setStep: () => {},
}

const GameStartPage = ({ setStep }: Props) => {
  return (
    <>
      <Button size='xl' title={'Start New Game'} onClick={() => setStep('setup')} />
    </>
  )
}

export default GameStartPage
