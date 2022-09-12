// @flow

type Props = {
  name: String,
  theme: String,
  errorMessage: String,
}

const InputErrorMessage = ({ name, theme, errorMessage }: Props) => {
  return (
    <>
      <p className='mt-2 text-sm text-red-600' id={`${name}-${theme}`}>
        {errorMessage}
      </p>
    </>
  )
}

export default InputErrorMessage
