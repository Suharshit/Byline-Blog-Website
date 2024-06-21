import React, { useEffect, useState, useCallback } from 'react'
import appwriteService from '../appwrite/authService'
import userProfileService from '../appwrite/userProfileData'
import appwriteBlogService from '../appwrite/blogService'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ArticleCard from './articleComp/ArticleCard'
import { userProfileCreated } from '../store/userProfileSlice'

const Profile = () => {
  const [profileData, setProfileData] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)

  // const deleteAccount = async(userData) => {
  //   try {
  //     await userProfileService.deleteUserProfile(userData.$id)
  //     await appwriteService.deleteUser(userData.$id)
  //     navigate('/signup')
  //   } catch (error) {
  //     console.log("DeleteUser :: Profile :: ", error)
  //   }
  // }

  useEffect(() => {
    const userProfile = async() => await userProfileService.getUserProfile(userData.$id).then((data) => {
      setProfileData(data)
      dispatch(userProfileCreated({data}))
    })
    appwriteBlogService.getUserPosts(userData.$id).then((posts) => setUserPosts(posts.documents))

    userProfile()
  }, [userData, setProfileData])

  if(!userData){
    navigate('/login')
  }
  return (
    <div className='flex flex-col px-20 space-y-5'>
      <div className='flex justify-between'>
        <div className='min-h-48 w-2/3 flex space-x-5'>
          {
            profileData.ProfileImage ? (
              <img src={userProfileService.getFilePreveiw(profileData.ProfileImage)} alt="" className='h-52 w-52 rounded-full'/>
            ) : (
              <img src="https://i.pinimg.com/236x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg" alt="" className='h-48 rounded-full'/>
            )
          }
          <div className='flex flex-col justify-center'>
            <h1 className='text-xl font-bold'>{profileData.name}</h1>
            <p className='text-lg text-zinc-300'>{profileData.email}</p>
            <p className='text-md font-light w-64 text-zinc-400'>{profileData.bio}</p>
          </div>
        </div>
        <div className='space-x-3 font-semibold'>
          <button className='bg-[#EEF0E5] text-black p-3 rounded-xl' onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>
      </div>
      <div className='space-y-3'>
        <h1 className='text-2xl font-bold'>My Posts</h1>
        {
          userPosts.length === 0 ? (
            <div>
              <p className='text-xl font-bold text-zinc-400'>No posts yet!</p>
            </div>
          ) : (
            <div className='grid grid-cols-4 space-x-10'>
              {
                userPosts.map((post) => (
                <div key={post.$id} className='max-h-44'>
                  <ArticleCard {...post}/>
                </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Profile