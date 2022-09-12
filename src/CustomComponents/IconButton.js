//  @flow

import { buttonTheme } from '../configs/global-styles'
import Icon from './Icon'

type Props = {
  icon: String,
  size: String,
  status: String,
  customIconStyle: String,
  overrideIconStyle: String,
  onClick: () => {},
}

const IconButton = ({ icon, size, status, customIconStyle, overrideIconStyle, onClick }: Props) => {
  return (
    <>
      <button type='button' className={`inline-flex ${buttonTheme.icon}`} onClick={onClick}>
        <Icon
          icon={icon}
          size={size}
          iconStatus={status}
          customIconStyle={customIconStyle}
          overrideIconStyle={overrideIconStyle}
        />
      </button>
    </>
  )
}

export default IconButton
