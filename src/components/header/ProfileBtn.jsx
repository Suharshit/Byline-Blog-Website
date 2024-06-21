import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileBtn = () => {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate('/profile')}>
      <img src="https://i.pinimg.com/474x/6d/35/9b/6d359b1322ba3eb00536ede4e382bea1.jpg" alt="" className='rounded-full w-[50px]'/>
    </button>
  )
}

export default ProfileBtn