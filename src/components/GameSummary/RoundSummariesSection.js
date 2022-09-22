// @flow

type Props = {
  scorecard: Object,
}

const RoundSummariesSection = ({ scorecard }: Props) => {
  return (
    <div className='relative flex items-start py-4'>
      <div className='w-full flex-1 text-sm justify-between flex'>
        <p className='select-none font-medium text-gray-700'>{scorecard?.name}</p>
        <p className='select-none font-medium text-gray-700'>{scorecard?.totalRoundPoints}</p>
      </div>
    </div>
  )
}

export default RoundSummariesSection
