// @flow

type Props = {
  player: Object,
  playerHighScoreId: String,
}

const TotalScoreSection = ({ player, playerHighScoreId }: Props) => {
  return (
    <div className='relative flex items-start py-4'>
      <div className='w-full flex-1 text-sm justify-between flex'>
        <p
          className={`select-none font-medium ${
            playerHighScoreId === player?.id ? 'text-sky-500' : 'text-gray-700'
          } `}
        >
          {player?.name}
        </p>
        <p
          className={`select-none font-medium ${
            playerHighScoreId === player?.id ? 'text-sky-500' : 'text-gray-700'
          } `}
        >
          {player?.score}
        </p>
      </div>
    </div>
  )
}

export default TotalScoreSection
