import { colorThemes } from '../configs/global-styles'
import Icon from './Icon'

const NotificationIconButton = () => {
  return (
    <>
      <button
        type='button'
        className={`flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorThemes.primary.focusRing}`}
      >
        <span className='sr-only'>View notifications</span>
        <Icon icon={'bell'} size='2xl' />
      </button>
    </>
  )
}

export default NotificationIconButton
