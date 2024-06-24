import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import ProfileBtn from './ProfileBtn'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../../appwrite/blogService'
import { setSearchPosts } from '../../store/searchPostsSlice'
import Logo from '../Logo'
import { useEffect, useState } from 'react'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search, setSearch] = useState()
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
            name: "Home",
            path: "/",
            active: authStatus,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        // {
        //     name: "SignUp",
        //     path: "/signup",
        //     active: !authStatus,
        // },
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

    useEffect(() => {
        const searchPosts = async() => {
            const searchedPosts = await blogService.getUserSearchPosts(search).then((posts) => {
                dispatch(setSearchPosts(posts.documents))
            })
        }
        searchPosts()
    }, [search])

    const searchPosts = async() => {
        const searchedPosts = await blogService.getUserSearchPosts(search).then((posts) => {
            dispatch(setSearchPosts(posts.documents))
        })
    }

    // console.log(search);


  return (
    <div className='py-1 pt-8 mx-8 flex justify-between items-center'>
        <div>
            <Link to={'/'}>
                <Logo width={'200px'} />
            </Link>
        </div>
        <nav className='flex items-center'>
            <div className='w-[300px] mr-6 flex border-2 border-zinc-900 rounded-xl'>
                <input type="search" placeholder='Search Article' onChange={(e) => {
                        if(e.currentTarget.value !== ''){
                            setSearch(e.currentTarget.value)
                        } else {
                            setSearch('')
                        }
                    }} className='w-full h-10 px-3 rounded-l-xl bg-zinc-300 outline-none'/>
                <button type="submit" className='text-black h-10 w-auto px-2 bg-zinc-300 rounded-r-xl' onClick={() => searchPosts()}>
                    <svg width="26" height="26" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <ul className='flex gap-x-4 text-lg font-semibold items-center'>
                {navItems.map((item) => item.active ? (
                    <li key={item.name}>
                        <button
                            onClick={() => navigate(item.path)}
                            className={`active:text-[#B6BBC4] ${!authStatus ? 'bg-[#102C57] px-5 py-2 rounded-lg text-[#FEFAF6]' : 'null'}`}
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