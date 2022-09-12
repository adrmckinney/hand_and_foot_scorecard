// @flow
import React, { Node } from 'react'

type Props = {
  children: Node,
  as?: String,
  flex?: Object,
  flex1?: Object,
  flexDir?: Object,
  verticalPosition?: Object,
  horizontalPosition?: Object,
  classNames?: String | Array,
  styles?: Object,
}

const HorizontalLayout = ({
  children,
  as: CustomTag = 'div',
  flex = { mbl: 'hidden', sm: 'flex', md: '', lg: '', xl: '' },
  flex1 = { mbl: '', sm: 'flex-1', md: '', lg: '', xl: '' },
  flexDir = { mbl: '', sm: 'row', md: '', lg: '', xl: '' },
  verticalPosition = { mbl: '', sm: 'center', md: '', lg: '', xl: '' },
  horizontalPosition = { mbl: '', sm: 'start', md: '', lg: '', xl: '' },
  classNames = '',
  styles = {},
}: Props) => {
  return (
    <CustomTag
      className={Styles.layout({
        flex,
        flex1,
        flexDir,
        verticalPosition,
        horizontalPosition,
        classNames,
      })}
      style={{ ...styles }}
    >
      {children}
    </CustomTag>
  )
}

export default HorizontalLayout

const Styles = {
  layout: ({ flex, flex1, flexDir, verticalPosition, horizontalPosition, classNames }) =>
    [
      flex.mbl,
      flex1.mbl,
      `flex-${flexDir.mbl}`,
      `items-${verticalPosition.mbl}`,
      `justify-${horizontalPosition.mbl}`,

      `sm:${flex.sm}`,
      `sm:${flex1.sm}`,
      `sm:flex-${flexDir.sm}`,
      `sm:items-${verticalPosition.sm}`,
      `sm:justify-${horizontalPosition.sm}`,

      `md:${flex.md}`,
      `md:${flex1.md}`,
      `md:flex-${flexDir.md}`,
      `md:items-${verticalPosition.md}`,
      `md:justify-${horizontalPosition.md}`,

      `lg:${flex.lg}`,
      `lg:${flex1.lg}`,
      `lg:flex-${flexDir.lg}`,
      `lg:items-${verticalPosition.lg}`,
      `lg:justify-${horizontalPosition.lg}`,

      `xl:${flex.xl}`,
      `xl:${flex1.xl}`,
      `xl:flex-${flexDir.xl}`,
      `xl:items-${verticalPosition.xl}`,
      `xl:justify-${horizontalPosition.xl}`,

      classNames,
    ].join(' '),
}
