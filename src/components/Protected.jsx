import React, {useState, useEffect, Children} from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate,  } from 'react-router-dom'

const Protected = ({children, authentication = true}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const userStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && userStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && userStatus !== authentication) {
      navigate('/')
    }
    setLoading(false)
  }, [loading, userStatus, navigate])
  
  return loading ? (
    <div>Loading...</div>
  ) : children;
}

export default Protected