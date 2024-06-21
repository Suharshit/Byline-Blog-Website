import React, {useId} from 'react'

const Input = ({
  label,
  type = 'text',
  className = '',
  ...props
}, ref) => {

  const id = useId()

  return (
    <div className='w-full space-y-2'>
      {
        label && (
          <label 
            htmlFor={id}
            className='text-lg font-semibold'
            >
            {label}
          </label>
        )
      }
      <input 
        type={type}
        className={`p-2 rounded-lg w-full text-black outline-gray-800 ${className}`}
        id={id}
        ref={ref}
        {...props}
        />
    </div>
  )
}

export default React.forwardRef(Input)