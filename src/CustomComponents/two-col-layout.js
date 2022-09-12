// @flow

import React, { Node } from 'react'
import HorizontalLayout from './horizontal-layout'

type Props = {
  leftColContent: Node,
  rightColContent: Node,
  leftSrOnlyTitle?: String,
  leftClassNames?: String,
  leftStyles?: Object,
  rightClassNames?: String,
  rightStyles?: Object,
  wrapperClassNames?: String,
}

const TwoColLayout = ({
  leftColContent,
  rightColContent,
  leftSrOnlyTitle,
  leftClassNames,
  leftStyles,
  rightClassNames,
  rightStyles,
  wrapperClassNames,
  columnDistribution,
}: Props) => {
  return (
    <>
      <HorizontalLayout classNames={`overflow-hidden ${wrapperClassNames}`} flex={{ mbl: 'flex' }}>
        {/* Left Section */}
        <section
          aria-labelledby='left-section'
          className={`min-w-0 flex-1 h-full flex flex-col overflow-auto ${leftClassNames}`}
          style={{ ...leftStyles }}
        >
          <p id='left-section' className='sr-only'>
            {leftSrOnlyTitle}
          </p>
          {leftColContent}
        </section>

        {/* Right Section */}
        <section
          aria-labelledby='right-section'
          className={`min-w-0 flex-1 h-full flex flex-col overflow-auto ${rightClassNames}`}
          style={{ ...rightStyles }}
        >
          <p id='right-section' className='sr-only'>
            {leftSrOnlyTitle}
          </p>
          {rightColContent}
        </section>
      </HorizontalLayout>
    </>
  )
}

export default TwoColLayout
