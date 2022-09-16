// @flow

import PaddedLayout from './padded-layout'

type Props = {
  title: String,
  component: Node,
}

const Page = ({ title, component, footerComponent }: Props) => {
  return (
    <>
      <header className='sticky top-0 bg-gray-200'>
        <PaddedLayout classNames='flex justify-center'>
          <h1 className='text-3xl font-bold tracking-tight text-sky-700'>{title}</h1>
        </PaddedLayout>
      </header>
      <div className='mt-32 mb-24 mx-auto h-full max-w-7xl sm:px-6 lg:px-8 flex flex-col justify-between'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 h-full flex justify-center items-center'>
          <PaddedLayout>{component}</PaddedLayout>
        </div>
      </div>
      <footer className='sticky bottom-0 bg-gray-200'>
        <PaddedLayout>{footerComponent}</PaddedLayout>
      </footer>
    </>
  )
}

export default Page
