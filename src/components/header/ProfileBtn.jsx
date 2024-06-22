import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileService from '../../appwrite/userProfileData'
import { useSelector } from 'react-redux'

const ProfileBtn = () => {
  const [userData, setUserData] = useState()
  const [profile, setProfile] = useState()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)

  useEffect(() => {
    const userProfile = async() => await userProfileService.getUserProfile(user.$id).then((data) => {
      setUserData(data)
    })
    if(userData === undefined){
      setProfile("https://i.pinimg.com/236x/d1/e3/d2/d1e3d2a12bc3d0221898c4391dffcfff.jpg")
    } else {
      setProfile(userProfileService.getFilePreveiw(userData.ProfileImage))
    }
    userProfile()
  }, [user, userData])


  return (
    <button onClick={() => navigate('/profile')}>
      <img src={profile} alt="" className='rounded-full w-[60px] h-[60px] shadow-xl border-2 border-[#102C57]'/>
    </button>
  )
}

export default ProfileBtn