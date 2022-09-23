// @flow

import React from 'react'
import {
  CheckIcon,
  Bars3Icon,
  PlusIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  MinusSmallIcon,
} from '@heroicons/react/24/solid'
import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  ArrowUturnLeftIcon,
  CodeBracketIcon,
  CommandLineIcon,
  EyeIcon,
  EyeSlashIcon,
  BellIcon,
  CurrencyDollarIcon,
  ListBulletIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { colorThemes } from '../configs/global-styles'

const sizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
  '2xl': 'h-8 w-8',
}

type Props = {
  icon: String,
  customIconStyle: String,
  overrideIconStyle: Object,
  size: String,
  iconStatus: String,
}

const Icon = ({
  icon = '',
  customIconStyle = '',
  overrideIconStyle = null,
  size = 'md',
  iconStatus = '',
}: Props) => {
  const icons = {
    mailSolid: (
      <EnvelopeIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    refresh: (
      <ArrowPathIcon
        className={`${sizes[size]} mr-2 self-center animate-spin transform rotate-180 ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    edit: (
      <PencilSquareIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    delete: (
      <TrashIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    xicon: (
      <XMarkIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    check: (
      <CheckIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    reply: (
      <ArrowUturnLeftIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    code: (
      <CodeBracketIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    terminal: (
      <CommandLineIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    bars: (
      <Bars3Icon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    plusSm: (
      <PlusIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    eye: (
      <EyeIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    eyeSlash: (
      <EyeSlashIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    bell: (
      <BellIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    magnifyingGlass: (
      <MagnifyingGlassIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    money: (
      <CurrencyDollarIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    list: (
      <ListBulletIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    minus: (
      <MinusSmallIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    star: (
      <StarIcon
        className={[
          `${sizes[size]}`,
          'mr-2 self-center',
          `${iconStatus?.length > 0 ? colorThemes[iconStatus].iconText : ''}`,
          `${customIconStyle}`,
        ].join(' ')}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    exclamation: (
      <ExclamationCircleIcon
        className={[
          `${sizes[size]}`,
          'mr-2 self-center',
          `${iconStatus?.length > 0 ? colorThemes[iconStatus].iconText : ''}`,
          `${customIconStyle}`,
        ].join(' ')}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    lockClosed: (
      <LockClosedIcon
        className={[
          'mr-2 self-center',
          `${sizes[size]}`,
          `${iconStatus?.length > 0 ? colorThemes[iconStatus].iconText : ''}`,
          `group-${iconStatus?.length > 0 ? colorThemes[iconStatus].hoverIconText : ''}`,
          `${customIconStyle}`,
        ].join(' ')}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
  }

  return icons[icon]
}

export default Icon
