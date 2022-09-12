// @flow
import React, { Node } from 'react'

type Props = {
  children?: Node,
  as?: String,
  flex?: Object,
  flex1?: Object,
  flexDir?: Object,
  verticalPosition?: Object,
  horizontalPosition?: Object,
  classNames?: String | Array,
  styles?: Object,
  onClick?: () => {},
}

const VerticalLayout = ({
  children,
  as: CustomTag = 'div',
  flex = { mbl: 'flex', sm: '', md: '', lg: '', xl: '' },
  flex1 = { mbl: 'flex-1', sm: '', md: '', lg: '', xl: '' },
  flexDir = { mbl: 'col', sm: '', md: '', lg: '', xl: '' },
  verticalPosition = { mbl: 'center', sm: '', md: '', lg: '', xl: '' },
  horizontalPosition = { mbl: 'center', sm: '', md: '', lg: '', xl: '' },
  classNames = '',
  styles = {},
  onClick,
}: Props) => (
  <CustomTag
    onClick={onClick}
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

export default VerticalLayout

const Styles = {
  layout: ({ flex, flex1, flexDir, verticalPosition, horizontalPosition, classNames }) =>
    [
      flex.mbl,
      flex1.mbl,
      `flex-${flexDir.mbl}`,
      `items-${horizontalPosition.mbl}`,
      `justify-${verticalPosition.mbl}`,

      `sm:${flex.sm}`,
      `sm:${flex1.sm}`,
      `sm:flex-${flexDir.sm}`,
      `sm:items-${horizontalPosition.sm}`,
      `sm:justify-${verticalPosition.sm}`,

      `md:${flex.md}`,
      `md:${flex1.md}`,
      `md:flex-${flexDir.md}`,
      `md:items-${horizontalPosition.md}`,
      `md:justify-${verticalPosition.md}`,

      `lg:${flex.lg}`,
      `lg:${flex1.lg}`,
      `lg:flex-${flexDir.lg}`,
      `lg:items-${horizontalPosition.lg}`,
      `lg:justify-${verticalPosition.lg}`,

      `xl:${flex.xl}`,
      `xl:${flex1.xl}`,
      `xl:flex-${flexDir.xl}`,
      `xl:items-${horizontalPosition.xl}`,
      `xl:justify-${verticalPosition.xl}`,

      classNames,
    ].join(' '),
}
