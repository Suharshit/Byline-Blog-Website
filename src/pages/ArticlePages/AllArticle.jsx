import React, { useState, useEffect } from 'react'
import ArticleCard from '../../components/articleComp/ArticleCard'
import appwriteBlogService from '../../appwrite/blogService'

const AllArticle = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    appwriteBlogService.getPosts([]).then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })
  }, [])

  if(posts && posts.length === 0){
    return (
      <div className='min-h-[480px] w-full flex items-center justify-center'>
        <h1 className='text-xl font-bold'>No Article found</h1>
      </div>
    )
  }
  return (
    <div className='min-h-96 w-full p-6'>
      <div className='grid grid-cols-3 gap-x-10'>
        {posts.map((post) => 
        (
          <div key={post.$id} className=''>
            <ArticleCard {
              ...post
            } />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllArticle