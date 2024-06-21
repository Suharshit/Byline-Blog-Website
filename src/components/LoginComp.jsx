import { useState } from 'react'
import appwriteService from '../appwrite/authService'
import userProfileService from '../appwrite/userProfileData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import {userProfileCreated} from '../store/userProfileSlice'
import { useForm } from 'react-hook-form'
import Logo from './Logo'
import {Input, Button, Select} from './index'

const LoginComp = () => {
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandle = async(data) => {
    setError('')
    try {
      setLoading(true)
      const session = await appwriteService.login(data)
      if(session){
        const userData = appwriteService.getCurrentUser()
        if(userData){
          dispatch(authLogin({userData}))
          const getUserProfile = await userProfileService.getUserProfile((await userData).$id)
          if(getUserProfile){
            dispatch(userProfileCreated({getUserProfile}))
          }
        }
        navigate('/')
      } else {
        console.log("session not created.")
        setLoading(false)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='w-[450px] flex flex-col items-center border-2 py-5 rounded-xl'>
      <div className='w-full flex flex-col items-center'>
        <h2 className='text-2xl font-semibold pb-5'>Sign in to your Account</h2>
        {error && <p className='text-white'>{error}</p>}
        <form onSubmit={handleSubmit(loginHandle)} className='flex flex-col w-full'>
          <div className='w-full flex flex-col items-center space-y-5 px-10'>
            {/* email input */}
            <Input
              label="Email: "
              type="email"
              placeholder="name@example.com"
              className="flex"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\S+@\S+\.\S+$/.test(value)  || "Invalid Email"
                }
              })}
              />

            {/* password input */}
            <Input
              label="Password: "
              type="password"
              placeholder="Password"
              className='flex'
              {...register("password", {
                required: true,
                validate: {
                  minLenth: (value) => value.length >= 8 || "Password must be of atleast 8 charachter"
                }
              })}
            />
            
            {/* submit button */}

            {
              loading ? (
                <div className='w-full py-3 flex items-center'>
                  <div className='w-full p-3 rounded-lg hover:bg-blue-800 bg-blue-600 text-center'>
                    Loading...
                  </div>
                </div>
              ) : (
                <div className='w-full py-3'>
                  <Button type="submit" className='w-full p-3 rounded-lg hover:bg-blue-800' bgColor='bg-blue-600'>
                    Log In
                  </Button>
                </div>
              )
            }
          </div>
        </form>
        <p className='text-lg'>
          Don&apos;t have any account?&nbsp;
          <Link to='/signup' className='text-blue-500 font-bold hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginComp