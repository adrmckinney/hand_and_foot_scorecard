import { useGameContext } from '../HOC/withGameContext'
import { usePlayerContext } from '../HOC/withPlayerContext'

const useGetActiveIndexes = () => {
  const { gameState } = useGameContext()
  const { playersState } = usePlayerContext()

  const activeRoundIdx = gameState?.findIndex(round => round?.isActive)

  const activePlayerIdx = playersState?.findIndex(player => player?.isActive)

  const activePlayerId = playersState
    ?.filter(player => player?.isActive)
    ?.map(player => player.id)[0]

  return { activeRoundIdx, activePlayerIdx, activePlayerId }
}

export default useGetActiveIndexes
