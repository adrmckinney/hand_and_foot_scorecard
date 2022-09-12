// @flow

import Button from '../CustomComponents/Button'
import HorizontalLayout from '../CustomComponents/horizontal-layout'
import Input from '../CustomComponents/input'
import PaddedLayout from '../CustomComponents/padded-layout'
import { usePlayerContext } from '../HOC/withPlayerContext'
import { v4 } from 'uuid'
import IconButton from '../CustomComponents/IconButton'
import { colorThemes } from '../configs/global-styles'
import { useGameContext } from '../HOC/withGameContext'

const GameSetupPage = () => {
  const { handleChange, playersState, setPlayersState } = usePlayerContext()
  const { gameState, setGameState, scoringData } = useGameContext()

  const addPlayer = () => {
    setPlayersState([...playersState, { id: v4(), name: '', score: 0, playFirst: false }])
  }

  const removePlayer = index => {
    let newInput = [...playersState]
    newInput?.splice(index, 1)

    setPlayersState(newInput)
  }

  return (
    <>
      {playersState?.map((formValue, index) => (
        <PaddedLayout key={index}>
          <HorizontalLayout classNames='space-x-2' flex={{ mbl: 'flex' }}>
            <Input
              hiddenLabel
              name={'name'}
              type='text'
              id={`player-${index + 1}`}
              required
              placeholder={`Player ${index + 1} Name`}
              value={formValue?.name}
              onChange={e => handleChange(e.target, index)}
            />
            <IconButton
              size={'lg'}
              onClick={() => removePlayer(index)}
              icon='delete'
              customIconStyle={colorThemes.danger.iconText}
            />
          </HorizontalLayout>
        </PaddedLayout>
      ))}
      <PaddedLayout classNames={'flex justify-end'}>
        <Button title={'Add Player'} size={'sm'} onClick={() => addPlayer()} />
      </PaddedLayout>
    </>
  )
}

export default GameSetupPage
