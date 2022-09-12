// @flow

import React from 'react'
import ConditionalRender from './conditional-render'
import HorizontalLayout from '../CustomComponents/horizontal-layout'
import { fontThemes, inputThemes } from '../configs/global-styles'
import InputErrorMessage from './input-error-message'
import Icon from './Icon'

type Props = {
  fieldValidationIcon?: Boolean,
  placeholder?: String,
  type: String,
  name: String,
  dataId: Number,
  id?: String,
  theme?: String,
  hiddenLabel?: Boolean,
  label?: String,
  labelRight?: any,
  defaultValue?: String,
  value: String,
  required: Boolean,
  icon?: String,
  inputStyles?: Object,
  labelStyles?: Object,
  isTextArea?: Boolean,
  textAreaHeight?: String,
  rows?: Number,
  ref?: Object,
  errors?: Object,
  touched?: Boolean,
  showPassword?: Boolean,
  iconSize: String,
  iconStatus: String,
  customIconStyle: String,
  overrideIconStyle: String,
  setShowPassword?: () => {},
  onChange: () => {},
  onKeyDown?: () => {},
}

const Input = ({
  fieldValidationIcon = false,
  placeholder = '',
  type = '',
  name = '',
  dataId = null,
  id = '',
  theme = 'normal',
  hiddenLabel = false,
  label = '',
  labelRight = null,
  defaultValue = '',
  value = '',
  required = false,
  icon = '',
  inputStyles,
  labelStyles,
  isTextArea = false,
  textAreaHeight = '',
  rows = 4,
  ref,
  errors,
  touched,
  showPassword,
  iconSize,
  iconStatus,
  customIconStyle,
  overrideIconStyle,
  setShowPassword,
  onChange,
  onKeyDown,
}: Props) => {
  return (
    <>
      <ConditionalRender
        condition={!isTextArea}
        falseRender={
          <div className={textAreaHeight}>
            <ConditionalRender
              condition={!labelRight}
              falseRender={
                <HorizontalLayout horizontalPosition={{ sm: 'between' }}>
                  <label htmlFor={name} className={`block ${fontThemes.inputLabel}`}>
                    {label}
                  </label>
                  <span className='text-sm text-gray-500'>{labelRight}</span>
                </HorizontalLayout>
              }
            >
              <label
                htmlFor={name}
                className={`block ${fontThemes.inputLabel}`}
                style={{ ...labelStyles }}
              >
                {label}
              </label>
            </ConditionalRender>
            <div className={`mt-1 ${textAreaHeight}`}>
              <textarea
                ref={ref}
                rows={rows}
                name={name}
                id={`${id}-textarea`}
                placeholder={placeholder}
                value={value}
                required={required}
                style={{ ...inputStyles }}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={touched}
                className={[
                  'shadow-sm block w-full px-2 h-full',
                  fontThemes.inputText,
                  inputThemes[theme],
                ].join(' ')}
              />
            </div>
          </div>
        }
      >
        <div className={theme === 'stackedTop' || theme === 'stackedBottom' ? '-space-y-px' : ''}>
          <ConditionalRender
            condition={!labelRight}
            falseRender={
              <HorizontalLayout horizontalPosition={{ sm: 'between' }}>
                <label htmlFor={name} className={`block ${fontThemes.inputLabel}`}>
                  {label}
                </label>
                <span className='text-sm text-gray-500'>{labelRight}</span>
              </HorizontalLayout>
            }
          >
            <label
              htmlFor={name}
              className={hiddenLabel ? 'sr-only' : `block ${fontThemes.inputLabel}`}
              style={{ ...labelStyles }}
            >
              {label}
            </label>
          </ConditionalRender>
          <div
            className={`${
              name === 'password' || name === 'confirm_password' ? 'flex' : 'relative'
            } mt-1 shadow-sm`}
          >
            <ConditionalRender condition={icon}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Icon
                  icon={icon}
                  size={iconSize}
                  iconStatus={iconStatus}
                  customIconStyle={customIconStyle}
                  overrideIconStyle={overrideIconStyle}
                />
              </div>
            </ConditionalRender>
            <input
              ref={ref}
              type={type}
              name={name}
              data-id={dataId}
              id={`${id}-input`}
              placeholder={placeholder}
              value={value}
              required={required}
              aria-invalid={fieldValidationIcon.toString()}
              aria-describedby={`${name}-${inputThemes[theme]['error']}`}
              style={{ ...inputStyles }}
              onChange={onChange}
              onBlur={touched}
              className={[
                icon ? 'pl-10' : 'px-3',
                'py-2 ',
                fontThemes.inputText,
                inputThemes[theme],
                'block w-full',
                `${
                  name === 'password' || name === 'confirm_password'
                    ? 'border-r-0 rounded-r-none'
                    : ''
                }`,
              ].join(' ')}
            />
            <ConditionalRender condition={name === 'password' || name === 'confirm_password'}>
              <button
                type='button'
                tabIndex='-1'
                className={['px-3 py-2', inputThemes[theme], 'border-l-0 rounded-l-none'].join(' ')}
                style={
                  theme === 'stackedBottom'
                    ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                    : {}
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon icon='eyeSlash' size={'sm'} />
                ) : (
                  <Icon icon='eye' size={'sm'} />
                )}
              </button>
            </ConditionalRender>
            <ConditionalRender
              condition={
                (name !== 'password' || name === 'confirm_password') && fieldValidationIcon
              }
            >
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <Icon icon='exclamation' iconStatus='danger' />
              </div>
            </ConditionalRender>
          </div>
        </div>
        {errors?.map(error => (
          <ConditionalRender key={error?.message} condition={error?.value}>
            <InputErrorMessage name={name} theme={theme} errorMessage={error?.message} />
          </ConditionalRender>
        ))}
      </ConditionalRender>
    </>
  )
}

export default Input
