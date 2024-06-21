import { Link } from 'react-router-dom'
import { useState } from 'react'
import appwriteService from '../appwrite/authService'
import userProfileService from '../appwrite/userProfileData'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import {useForm} from 'react-hook-form'
import {Input, Button, Select} from './index'
import {userProfileCreated} from '../store/userProfileSlice'

const SignUpComp = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signuphandle = async(data) => {
    setError('')
    try {
      setLoading(true)
      const createUser = await appwriteService.createAccount(data)
      if(createUser){
        const userData = appwriteService.getCurrentUser()
        if(userData) {
          dispatch(authLogin({userData}))
          const userProfile = await userProfileService.createUserProfile({
            userProfileId: (await userData).$id,
            name: (await userData).name,
            email: (await userData).email,
          })
          if(userProfile){
            dispatch(userProfileCreated({userProfile}))
          }
        }
        navigate('/')
        setLoading(false)
      }
    } catch (error) {
      setError(error.message)
      console.log("appwriteService :: signupComp :: ", error);
    }
  }
  return (
    <div className='w-[450px] flex flex-col items-center border-2 py-5 rounded-xl'>
      <div className='w-full flex flex-col items-center'>
        <h2 className='text-2xl font-semibold pb-5'>SignUp to create Account</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(signuphandle)} className='flex flex-col w-full'>
          <div className='w-full flex flex-col items-center space-y-5 px-10'>
            {/* Name Input */}
            <Input
              type="text"
              className="flex"
              {...register("name", { required: true })}
              placeholder="Name"
              label="Name :"
            />

            {/* email input */}
            <Input
              type="email"
              label="Email :"
              placeholder="name@emample.com"
              className='flex'
              {...register("email", {
                required: true,
                validate: {
                  pattern: (value) => /^\S+@\S+\.\S+$/.test(value)  || "Invalid Email"
                }
              })}
            />

            {/* Password Input */}
            <Input
              type="password"
              label="Password :"
              placeholder="password"
              className='flex'
              {...register("password", {
                required: true,
                validate: {
                  minlength: (value) => value.length >= 8 || "Password must be of atleast 8 charachter"
                }
              })}
            />

            {
              loading ? (
                <div className='w-full py-3 flex items-center'>
                  <div className='w-full p-3 rounded-lg hover:bg-blue-800 bg-blue-600 text-center'>
                    Loading...
                  </div>
                </div>
              ) : (
                <div className='w-full py-3'>
                  <Button type="submit" 
                    className='w-full p-3 rounded-lg hover:bg-blue-800' bgColor='bg-blue-600'>
                    Create Account
                  </Button>
                </div>
              )
            }
          </div>
        </form>
        <p>
          Already have an account?&nbsp;
          <Link to="/login" className='text-blue-500 font-bold hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpComp