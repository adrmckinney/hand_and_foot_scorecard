// @flow

import { useEffect, useState } from 'react'
import ScorecardSection from '../components/Scorecard/ScorecardSection'
import { colorThemes } from '../configs/global-styles'
import Button from '../CustomComponents/Button'
import IconButton from '../CustomComponents/IconButton'
import Input from '../CustomComponents/input'
import { useGameContext } from '../HOC/withGameContext'
import { usePlayerContext } from '../HOC/withPlayerContext'

const RoundScorePage = () => {
  const { playersState, setActivePlayer, getInactivePlayers } = usePlayerContext()
  const { handleScoreStateChange, gameState } = useGameContext()

  const activeRoundIdx = gameState?.findIndex(round => round?.isActive)

  const bookFields = [
    {
      field: 'dirty',
      scoreType: 'books',
      label: 'Dirty',
    },
    {
      field: 'clean',
      scoreType: 'books',
      label: 'Clean',
    },
    {
      field: 'wild',
      scoreType: 'books',
      label: 'Wild',
    },
  ]

  const playedCardsFields = [
    {
      field: 'fivePointCards',
      scoreType: 'playedCards',
      label: '5pt cards',
    },
    {
      field: 'tenPointCards',
      scoreType: 'playedCards',
      label: '10pt cards',
    },
    {
      field: 'twentyPointCards',
      scoreType: 'playedCards',
      label: '20pt cards',
    },
    {
      field: 'fiftyPointCards',
      scoreType: 'playedCards',
      label: '50pt cards',
    },
  ]

  const heldCardsFields = [
    {
      field: 'fivePointCards',
      scoreType: 'heldCards',
      label: '5pt cards',
    },
    {
      field: 'tenPointCards',
      scoreType: 'heldCards',
      label: '10pt cards',
    },
    {
      field: 'twentyPointCards',
      scoreType: 'heldCards',
      label: '20pt cards',
    },
    {
      field: 'fiftyPointCards',
      scoreType: 'heldCards',
      label: '50pt cards',
    },
    {
      field: 'redThrees',
      scoreType: 'heldCards',
      label: 'Red Threes',
    },
  ]

  const inactivePlayers = getInactivePlayers() ?? null
  const activePlayerIdx = playersState?.findIndex(player => player?.isActive)

  return (
    <>
      <div className='space-y-6'>
        <div className='flex flex-col justify-between items-center space-y-4'>
          <h2 className='text-3xl font-bold tracking-tight text-sky-700'>
            Scoring {playersState?.[activePlayerIdx]?.name}
          </h2>
          <div className='flex justify-around w-full'>
            {inactivePlayers?.map(player => (
              <Button
                key={player?.id}
                title={`Score ${player?.name}`}
                size={'xs'}
                onClick={() => setActivePlayer(player?.id)}
              />
            ))}
          </div>
        </div>
        <ScorecardSection title={'Books'} fields={bookFields} />
        <ScorecardSection title={'Played Cards'} fields={playedCardsFields} />
        <ScorecardSection title={'Held Cards'} fields={heldCardsFields} />
      </div>
    </>
  )
}

export default RoundScorePage
