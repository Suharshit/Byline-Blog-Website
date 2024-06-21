import React from 'react'
import { Link } from 'react-router-dom'
import appwriteBlogService from '../../appwrite/blogService'

const ArticleCard = ({
    $id,
    title,
    featuredImage
}) => {
  return (
    <Link to={`/article/${$id}`}>
        <div className='min-h-[310px] bg-[#31304D] w-[450px] p-3 rounded-xl space-y-3 shadow-2xl'>
            <div className='flex w-full justify-center'>
                <img src={appwriteBlogService.getFilePreview(featuredImage)} alt={title} className='rounded-xl max-h-56 border-2'/>
            </div>
            <h2 className='flex gap-x-2 font-bold text-lg px-4'>
                Title: <p className='font-normal'>{title}</p>
            </h2>
        </div>
    </Link>
  )
}

export default ArticleCard