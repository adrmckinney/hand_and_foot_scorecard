// @flow

import PaddedLayout from './padded-layout'

type Props = {
  title: String,
  component: Node,
}

const Page = ({ title, component, footerComponent }: Props) => {
  return (
    <>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 h-screen flex flex-col justify-between'>
        <PaddedLayout classNames='flex justify-center'>
          <h1 className='text-3xl font-bold tracking-tight text-sky-700'>{title}</h1>
        </PaddedLayout>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 h-full flex justify-center items-center'>
          <PaddedLayout>{component}</PaddedLayout>
        </div>
        <PaddedLayout classNames={'mb-6'}>{footerComponent}</PaddedLayout>
      </div>
    </>
  )
}

export default Page
