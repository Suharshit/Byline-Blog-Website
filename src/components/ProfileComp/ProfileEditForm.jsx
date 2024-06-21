import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import userProfileService from '../../appwrite/userProfileData'
import authService from '../../appwrite/authService'
import Input from '../minorComp/Input'
import Button from '../minorComp/Button'
import { useSelector } from 'react-redux'


const ProfileEditForm = ({userProfileData}) => {
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.userProfile.user.data)
  const { register, handleSubmit} = useForm({
    defaultValues: {
      name: userProfile.name || '',
      email: userProfile.email || '',
      bio: userProfile.bio || '',
    }
  })

  const submit = async(data) => {
    const file = await userProfileService.uploadUserProfileImage(data.image[0])
    console.log(file)
    if(file){
      if(userProfile.ProfileImage !== null){
        await userProfileService.deleteUserProfileImage(userProfile.ProfileImage)
      }
    }
    const updateProfile = await userProfileService.updateUserProfile(userProfileData.$id, {
      ...data,
      ProfileImage: file ? file.$id : userProfile.ProfileImage

    })
    if(updateProfile){
      authService.updateName(data.name)
    }
    console.log(updateProfile)
    if(updateProfile){
      navigate('/profile')
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)} className='h-auto w-full py-4 px-32'>
      <div className='flex'>
        <div className='h-[560px]'>
          <div className=''>
            {userProfile.ProfileImage ? (
              <div>
                <img src={userProfileService.getFilePreveiw(userProfile.ProfileImage)} alt={userProfile.name} className='h-[340px] w-[340px] rounded-full'/>
              </div>
            ) : (
              <div>
                <img src="https://i.pinimg.com/236x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg" alt="" className='rounded-full'/>
              </div>
            )}
          </div>
          <Input
            label="Profile Image:"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            className='text-zinc-400'
            {...register("image", {required: !userProfile})}
          />
        </div>
        <div className='pl-64 w-full'>
          <Input
            label='Name'
            placeholder='Name'
            {...register('name', {required: true})}
          />

          {/* <Input
            label='Email'
            placeholder='name@example.com'
            {...register('email', {
              required: true, 
              validate: {
                matchPatern: (value) => /^\S+@\S+\.\S+$/.test(value)  || "Invalid Email"
              }
            })
            }
          /> */}

          <Input
            type='textarea'
            label='Bio'
            placeholder='bio'
            {...register('bio', {required: true})}
          />
          <div className='pt-8'>
            <Button
              className='p-3 rounded-xl'
              type='submit'
              bgColor='bg-blue-600'
            >Update</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProfileEditForm