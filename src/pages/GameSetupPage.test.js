import { render, screen } from '@testing-library/react'
import { withGameContext } from '../HOC/withGameContext'
import { withPlayerContext } from '../HOC/withPlayerContext'
import GameSetupPage from './GameSetupPage'

const playersState = [
  {
    id: 'f7980ef9-ce14-4392-8ea5-79e46c90fd21',
    name: 'Dan',
    score: 5,
    isActive: true,
    playsFirst: true,
  },
  {
    id: '08d58004-683d-4b5e-8c03-526cb4fcff30',
    name: 'Marie',
    score: 200,
    isActive: false,
    playsFirst: false,
  },
]

const gameState = [
  {
    round: 1,
    meld_points: 60,
    isActive: true,
    winnerId: '',
  },
]

const Component = withPlayerContext(withGameContext(GameSetupPage, gameState), playersState)

test('renders add player button', () => {
  render(<Component />)
  const button = screen.getByRole('button', { name: 'Add Player' })
  expect(button).toBeInTheDocument()
})

test('renders player name input fields', () => {
  render(<Component />)

  const inputOne = screen.getAllByRole('textbox', { value: 'Dan' })
  const inputTwo = screen.getAllByRole('textbox', { value: 'Marie' })

  expect(inputOne).toHaveLength(2)
  expect(inputOne[0]).toBeInTheDocument()
  expect(inputTwo[0]).toBeInTheDocument()
})
