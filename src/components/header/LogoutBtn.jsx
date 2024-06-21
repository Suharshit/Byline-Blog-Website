import React from 'react'
import { useDispatch } from 'react-redux'
import appwriteService from '../../appwrite/authService'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const logouthandle = () => {
    appwriteService.logout().then(() => {
      dispatch(logout());
    })
  }
  return (
    <button onClick={logouthandle} className='bg-[#102C57] text-[#EADBC8] p-2 rounded-xl'>
      Logout
    </button>
  )
}

export default LogoutBtn