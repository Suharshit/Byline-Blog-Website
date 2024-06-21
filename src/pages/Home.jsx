import React , {useState, useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import appwriteBlogService from '../appwrite/blogService'
import ArticleCard from '../components/articleComp/ArticleCard'
import { ReactTyped } from 'react-typed'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const Home = () => {
  const [loader, setLoader] = useState(false)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
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

  return (loader && user && posts) ? (
    <div>
      <div className='space-y-5 p-6 px-10'>
        <div className='grid grid-cols-3 gap-x-10'>
        {posts ? posts.map((post) => (
            <div key={post.$id}>
              <ArticleCard {...post}/>
            </div>
          )): (
            <div>
              no post found
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-96 w-full'>
      <div className='flex min-h-[600px] justify-between items-center mb-8 p-6 px-10'>
        <div className='text-9xl w-1/2 flex flex-col'>
          Get The Insights <br /> You Need
          <ReactTyped strings={["Connected", "Collaborative","Inclusive"]} typeSpeed={40}
      backSpeed={50} loop className='text-2xl mx-1 font-semibold'/>
          <button className='text-lg flex-col flex bg-[#DAC0A3] text-[#102C57] px-6 py-2 rounded-xl font-semibold w-[155px]' onClick={() => navigate('/login')}>Get Started</button>
        </div>
        <div>
          <img src="https://static.vecteezy.com/system/resources/previews/004/491/051/original/blogging-concept-for-web-banner-man-blogger-writes-article-and-publishes-new-post-in-blog-for-followers-modern-person-scene-illustration-in-flat-cartoon-design-with-people-characters-vector.jpg" alt="" className='w-[700px] rounded-2xl shadow-2xl'/>
        </div>
      </div>
      <div className='space-y-8 p-6 px-10 pb-24'>
        <h1 className='text-center font-semibold text-5xl'>Top Articles</h1>
        <div className='grid grid-cols-3 gap-x-10'>
          {posts ? posts.map((post) => (
            <div key={post.$id}>
              <ArticleCard {...post}/>
            </div>
          )): (
            <div>
              no post found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home