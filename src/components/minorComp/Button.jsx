import React from 'react'

const Button = ({
  children,
  className = '',
  type = 'button',
  bgColor = '',
  textColor = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full ${className} ${bgColor} ${textColor}`}
      {...props}
      >
      {children}
    </button>
  )
}

export default Button