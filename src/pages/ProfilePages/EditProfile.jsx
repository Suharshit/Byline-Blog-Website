import React, {useState, useEffect} from 'react'
import ProfileEditForm from '../../components/ProfileComp/ProfileEditForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userProfileService from '../../appwrite/userProfileData'

const EditProfile = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    if (user) {
      userProfileService.getUserProfile(user.$id).then((data) => {
        setProfileData(data)
      })
    }
  }, [user])
  return (
    <div>
      <ProfileEditForm userProfileData={profileData}/>
    </div>
  )
}

export default EditProfile