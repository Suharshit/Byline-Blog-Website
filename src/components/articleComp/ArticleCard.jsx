import React from 'react'
import { Link } from 'react-router-dom'
import appwriteBlogService from '../../appwrite/blogService'

const ArticleCard = ({
    $id,
    title,
    description,
    owner,
    featuredImage
}) => {
  return (
    <Link to={`/article/${$id}`}>
        <div className='h-[440px] bg-[#EADBC8] w-[325px] p-3 rounded-xl space-y-1 shadow-xl overflow-hidden relative'>
            <div className='flex w-full justify-center'>
                <img src={appwriteBlogService.getFilePreview(featuredImage)} alt={title} className='rounded-xl min-h-56 max-h-60 border-2'/>
            </div>
            <h2 className='gap-x-2 font-bold text-xl px-4'>
                {title}
            </h2>
            <p className='gap-x-2 font-normal text-md px-4'>
                {description}
            </p>
            <p className='gap-x-2 font-normal text-sm flex justify-end bottom-2 right-2 absolute text-zinc-600'>
                Created by: {owner}
            </p>
        </div>
    </Link>
  )
}

export default ArticleCard