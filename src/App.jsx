import { useState, useEffect } from 'react'
import authService from './appwrite/authService'
import { login, logout } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/header/Header'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div>
      <div className=''>
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen w-full'>Loading...</div>
  )
}

export default App