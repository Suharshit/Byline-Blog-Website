import React , {useState, useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import appwriteBlogService from '../appwrite/blogService'
import ArticleCard from '../components/articleComp/ArticleCard'

const Home = () => {
  const [loader, setLoader] = useState(false)
  const [posts, setPosts] = useState([])
  const user = useSelector((state) => state.auth.userData)

  useEffect(() => {
    appwriteBlogService.getPosts().then((post) => {
      setPosts(post.documents)
    })
    if(user || posts){
      setLoader(true)
    }
  }, [user])

  if(posts?.length === 0 && !loader){
    return (
      <div className='min-h-[480px] w-full flex items-center justify-center'>
        <div>
          <h1 className='text-xl font-bold'>Login to read posts</h1>
        </div>
      </div>
    )
  }

  return loader ? (
    <div className='min-h-96 w-full p-6'>
      <div className='grid grid-cols-3 gap-x-10'>
        {posts.map((post) => (
          <div key={post.$id}>
            <ArticleCard {...post}/>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='flex min-h-96 w-full items-center justify-center'>
      Loading...
    </div>
  )
}

export default Home