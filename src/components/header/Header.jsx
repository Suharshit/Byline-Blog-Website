import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import ProfileBtn from './ProfileBtn'
import { useSelector } from 'react-redux'
import Logo from '../Logo'

const Header = () => {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
            name: "Home",
            path: "/",
            active: true,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        {
            name: "SignUp",
            path: "/signup",
            active: !authStatus,
        },
        // {
        //     name: "All Articles",
        //     path: "/all-articles",
        //     active: authStatus,
        // },
        {
            name: "Add Article",
            path: "/add-article",
            active: authStatus,
        }
    ]


  return (
    <div className='py-3 px-4 flex justify-between items-center'>
        <div>
            <Link to={'/'}>
                <Logo width={'200px'} />
            </Link>
        </div>
        <nav className=''>
            <ul className='flex gap-x-5 text-lg font-semibold items-center'>
                {navItems.map((item) => item.active ? (
                    <li key={item.name}>
                        <button
                            onClick={() => navigate(item.path)}
                            className='active:text-[#B6BBC4]'
                        >{item.name}</button>
                    </li>
                ) : null 
                )}
                {authStatus ? (
                    <li className='flex items-center gap-x-2'>
                        <LogoutBtn/> | <ProfileBtn/>
                    </li>
                ) : null }
            </ul>
        </nav>
    </div>
  )
}

export default Header