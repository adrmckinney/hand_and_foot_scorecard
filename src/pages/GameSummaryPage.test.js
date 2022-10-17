import { render, screen } from '@testing-library/react';
import { withGameContext } from '../HOC/withGameContext';
import { withPlayerContext } from '../HOC/withPlayerContext';
import { withPlayersGameContext } from '../HOC/withPlayerGameContext';
import GameSetupPage from './GameSetupPage';
import GameSummaryPage from './GameSummaryPage';


const playersState = [
    {
        "id": "f7980ef9-ce14-4392-8ea5-79e46c90fd21",
        "name": "Dan",
        "score": 5,
        "isActive": true,
        "playsFirst": true
    },
    {
        "id": "08d58004-683d-4b5e-8c03-526cb4fcff30",
        "name": "Feremy",
        "score": 200,
        "isActive": false,
        "playsFirst": false
    }
]

test('renders game summary page', () => {
    const Component = withPlayersGameContext(GameSetupPage, playersState)
    render(<Component/>);  
  const linkElement = screen.getByText(/Add Player/i);
  expect(linkElement).toBeInTheDocument();
});


