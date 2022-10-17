import { render, screen } from '@testing-library/react'
import App from './App'

test('renders start new game button', () => {
  render(<App />)
  const headerTitle = screen.getByText(/Hand and Foot Scorecard/i)
  expect(headerTitle).toBeInTheDocument()
})
