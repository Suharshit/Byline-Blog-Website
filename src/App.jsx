import { useState, useEffect } from 'react'
import authService from './appwrite/authService'
import { login, logout } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

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
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main className='min-h-fit'>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen w-full'>Loading...</div>
  )
}

export default App