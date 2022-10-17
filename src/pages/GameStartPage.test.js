import { render, screen } from '@testing-library/react'
import { withGameContext } from '../HOC/withGameContext'
import { withPlayerContext } from '../HOC/withPlayerContext'
import GameStartPage from './GameStartPage'

test('renders start new game button', () => {
  const Component = withPlayerContext(withGameContext(GameStartPage, []), [])
  render(<Component />)
  const button = screen.getByRole('button', { name: 'Start New Game' })
  expect(button).toBeInTheDocument()
})
