import { buttonTheme } from '../configs/global-styles'
import ConditionalRender from './conditional-render'
import Icon from './Icon'

const Button = ({
  as: CustomTag = 'button',
  type = 'button',
  title,
  size = 'md',
  status = 'primary',
  disabled = false,
  icon,
  iconStatus = '',
  onClick,
  to = '/',
  customClassName,
  overrideButtonStyle,
  customIconStyle,
  overrideIconStyle,
  role,
  labelPosition = 'center',
  children,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  srOnly,
  ref,
  onKeyPress,
  relativeGroup = false,
}) => {
  return (
    <CustomTag
      type={type}
      to={to}
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      onKeyPress={onKeyPress}
      style={overrideButtonStyle}
      role={role}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      className={[
        'inline-flex',
        'rounded-md',
        'shadow-sm',
        'border',
        'border-transparent',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'leading-4',
        `${SIZES[size]}`,
        // `${STATUSES[status]}`,
        `${buttonTheme[status]}`,
        `${LABEL_POSITION[labelPosition]}`,
        `${relativeGroup ? 'relative group' : ''}`,
        `${customClassName}`,
      ].join(' ')}
    >
      <ConditionalRender
        condition={relativeGroup}
        falseRender={
          <Icon
            icon={icon}
            size={size}
            iconStatus={status}
            customIconStyle={customIconStyle}
            overrideIconStyle={overrideIconStyle}
          />
        }
      >
        <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
          <Icon
            icon={icon}
            size={size}
            iconStatus={status}
            customIconStyle={customIconStyle}
            overrideIconStyle={overrideIconStyle}
          />
        </span>
      </ConditionalRender>
      {title}
      {children}
      {!!srOnly && <span className='sr-only'>{srOnly}</span>}
    </CustomTag>
  )
}

export default Button

const SIZES = {
  xs: ['px-1', 'py-0.5', 'text-xs', 'items-center'].join(' '),
  sm: ['px-3', 'py-2', 'text-sm', 'leading-4', 'items-center'].join(' '),
  md: ['px-4', 'py-2', 'text-sm', 'font-medium', 'items-center'].join(' '),
  lg: ['px-4', 'py-2', 'text-base', 'font-medium', 'items-center'].join(' '),
  xl: ['px-6', 'py-3', 'text-lg', 'font-medium', 'items-center'].join(' '),
  text: ['py-2', 'px-4', 'text-sm'].join(' '),
  mobileHamburger: 'p-2',
  link: 'p-0 text-sm',
  null: '',
}

const LABEL_POSITION = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const STATUSES = {
  mobileHamburger: [
    'bg-mediumPurple',
    'inline-flex',
    'items-center',
    'text-indigo-200',
    'hover:text-white',
    'hover:bg-darkerPurple',
    'hover:bg-opacity-75',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-darkerPurple',
    'focus:ring-white',
  ].join(' '),
  icon: 'bg-transparent',
  null: '',
}
