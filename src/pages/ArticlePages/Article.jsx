import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteBlogService from '../../appwrite/blogService'
import Button from '../../components/minorComp/Button'
import {useSelector} from 'react-redux'
import parse from 'html-react-parser'

const Article = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false
    const userStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteBlogService.getPost(slug).then((post) => {
            if(post) {
                setPost(post)
            } else {
                navigate('/')
            }
        })
    }, [slug, navigate])

    const deleteArticle = () => {
        appwriteBlogService.deletePost(post.$id).then((status) => {
            if(status){
                appwriteBlogService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

  return (post && userStatus) ? (
    <div className='min-h-96 min-w-screen p-6 flex flex-row-reverse justify-between mx-12'>
        <div className='w-full flex flex-col items-end space-y-3'>
            {isAuthor && (
                <div className='flex space-x-4'>
                    <Link to={`/edit-article/${post.$id}`}>
                        <Button bgColor='bg-[#F0ECE5]' textColor='text-black' className='p-2 px-8 rounded-lg hover:bg-[#b3b0aa]'>Edit</Button>
                    </Link>
                    <Button onClick={deleteArticle} bgColor='bg-red-700' textColor='text-white' className='p-2 px-6 rounded-lg space-y-3 hover:bg-red-900'>Delete</Button>
                </div>
            )}
            <img src={appwriteBlogService.getFilePreview(post.featuredImage)} alt={post.title} className='w-[460px] rounded-xl border-2 shoadow-2xl border-[#B6BBC4]'/>
        </div>
        <div className='min-h-[450px] max-w-[830px] space-y-3'>
            <h1 className='font-bold text-4xl'>{post.title}</h1>
            <h3 className='font-bold text-2xl text-zinc-700'>{post.description}</h3>
            <div className='font-normal text-xl text-zinc-700'>
                {parse(post.content)}
            </div>
        </div>
    </div>
  ) : userStatus ? (
    <div className='min-h-96 w-full flex items-center justify-center'>
        <h1>Loading...</h1>
    </div>
  ) : (
    <div className='min-h-[550px] w-full flex items-center justify-center'>
        <h1 className='font-bold text-2xl'>
            Login to Read the Article
        </h1>
    </div>
  )
}

export default Article