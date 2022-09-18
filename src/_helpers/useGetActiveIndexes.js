import { useGameContext } from '../HOC/withGameContext'
import { usePlayerContext } from '../HOC/withPlayerContext'

const useGetActiveIndexes = () => {
  const { gameState } = useGameContext()
  const { playersState } = usePlayerContext()

  const activeRoundIdx = gameState?.findIndex(round => round?.isActive)

  const activePlayerIdx = playersState?.findIndex(player => player?.isActive)

  return { activeRoundIdx, activePlayerIdx }
}

export default useGetActiveIndexes
