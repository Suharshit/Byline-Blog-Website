import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './components/Protected.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './components/Profile.jsx'
import AllArticle from './pages/ArticlePages/AllArticle.jsx'
import AddArticle from './pages/ArticlePages/AddArticle.jsx'
import EditArticle from './pages/ArticlePages/EditArticle.jsx'
import Article from './pages/ArticlePages/Article.jsx'
import EditProfile from './pages/ProfilePages/EditProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        )
      },
      {
        path: '/profile',
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        )
      },
      {
        path: '/edit-profile',
        element: (
          <Protected authentication>
            <EditProfile/>
          </Protected>
        )
      },
      {
        path: '/add-article',
        element: (
          <Protected authentication>
            <AddArticle/>
          </Protected>
        )
      },
      {
        path: '/article/:slug',
        element: <Article/>
      },
      {
        path: '/edit-article/:slug',
        element: (
          <Protected authentication>
            <EditArticle/>
          </Protected>
        )
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
