import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesList from '../ArticleList'
import Header from '../Header'
import ArticleDetail from '../../pages/ArticleDetail'
import CreateNewArticle from '../../pages/CreateNewArticle'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import EditProfilePage from '../../pages/EditProfilePage'
import EditArticle from '../../pages/EditArticle'
import { fetchGetProfile } from '../../api/user'
import { loginAction, setUser } from '../../store/reducers/userReducer'
import { selectUser } from '../../store/selectors/selectors'

import './App.scss'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const StorageTokenAuth = JSON.parse(localStorage.getItem('currentUser'))
      if (StorageTokenAuth !== null) {
        const getCurrUserHandler = async () => {
          const currentUser = await fetchGetProfile(StorageTokenAuth)
          if (currentUser) {
            dispatch(loginAction(true))
            if (
              !{ ...currentUser.user }.bio &&
              !{ ...currentUser.user }.image
            ) {
              dispatch(
                setUser({
                  ...currentUser.user,
                  bio: 'start up',
                  image:
                    'https://static.productionready.io/images/smiley-cyrus.jpg',
                }),
              )
            } else {
              dispatch(setUser(currentUser.user))
            }
          }
        }
        getCurrUserHandler()
      }
    }
  }, [dispatch, user])

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<ArticlesList />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/article/:slug' element={<ArticleDetail />} />
        <Route path='/profile' element={<EditProfilePage />} />
        <Route path='/new-article' element={<CreateNewArticle />} />
        <Route path='/articles/:slug/edit' element={<EditArticle />} />
      </Routes>
    </div>
  )
}

export default App
