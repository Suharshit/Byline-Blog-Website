import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteBlogService from '../../appwrite/blogService'
import ArticleForm from '../../components/articleComp/ArticleForm'

const EditArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    if(slug){
      appwriteBlogService.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])
  return post ? (
    <div>
      <ArticleForm post={post}/>
    </div>
  ) : null
}

export default EditArticle