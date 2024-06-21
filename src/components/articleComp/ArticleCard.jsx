import React from 'react'
import { Link } from 'react-router-dom'
import appwriteBlogService from '../../appwrite/blogService'

const ArticleCard = ({
    $id,
    title,
    description,
    featuredImage
}) => {
  return (
    <Link to={`/article/${$id}`}>
        <div className='min-h-[310px] bg-[#EADBC8] w-[380px] p-3 rounded-xl space-y-1 shadow-xl'>
            <div className='flex w-full justify-center'>
                <img src={appwriteBlogService.getFilePreview(featuredImage)} alt={title} className='rounded-xl max-h-56 border-2'/>
            </div>
            <h2 className='flex gap-x-2 font-bold text-lg px-4'>
                <p className='font-bold'>{title}</p>
            </h2>
            <h2 className='flex gap-x-2 font-bold text-lg px-4'>
                <p className='font-normal'>{description}</p>
            </h2>
        </div>
    </Link>
  )
}

export default ArticleCard